const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await new User({
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Hatalı kullanıcı adı",
            });
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: "Hatalı şifre",
            });
        }

        if(user.isAdmin){
            req.session.id = user._id;
            req.session.isAdmin=true;
            res.status(200).json({ success: true, user: 'admin'  });
        }
        // "nerons" için özel işlemler
        else if (req.body.email === "ezgidogan2396@gmail.com") {
            req.session.id = 'nerons';
            res.status(200).json({ success: true, user: "nerons",dashboard:true });
        }
        // "eywin" için özel işlemler
        else if (req.body.email === "ezgi@eywin.com") {
            req.session.id = 'eywin';
            res.status(200).json({ success: true, user: "eywin",dashboard:true });
        }
        else if (!user.isAdmin) {
            req.session.id = user._id;
            req.session.location = user.email === "ygtsez@gmail.com" ? "odtu" : "yuzyil";
            res.status(200).json({ success: true, user: req.session.location });
        }
        else {
            res.status(302).json({
                success: false,
                message: "Hatalı kullanıcı adı veya şifre",
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});


router.get("/user/id.json", async (req, res) => {
    if (req.session.isAdmin) {
        res.json({
            isAdmin: true,
            id: req.session.id,
        });
    } else if(req.session.location) {
        res.json({
            id: req.session.id,
            user: req.session.location,
        });
    }else {
        res.json({
            id: req.session.id,
            dashboard:true
        });
    }
});

router.post("/logout", async (req, res) => {
    req.session = null;
    res.status(200).json({ success: true });
});

module.exports = router;
