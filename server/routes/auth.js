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
//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "wrong username",
            });
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: "wrong password",
            });
        }

        req.session.id = user._id;
        if (user.isAdmin) {
            req.session.isAdmin = true;
            res.status(200).json({ isAdmin: true, success: true });
        } else if (req.body.email === "metucoffee101@gmail.com") {
            req.session.location = "yuzyil";
            res.status(200).json({ success: true, user: "yuzyil" });
        } else if (req.body.email === "ygtsez@gmail.com") {
            req.session.location = "odtu";
            res.status(200).json({ success: true, user: "odtu" });
        } else if (req.body.email === "ezgidogan2396@gmail.com") {
            req.session.location = "nerons";
            res.status(200).json({ success: true, user: "odtu" });
        }else {
            res.status(302).json({
                success: false,
                message: "wrong username or password",
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
    } else {
        res.json({
            id: req.session.id,
            user: req.session.location,
        });
    }
});

router.post("/logout", async (req, res) => {
    req.session = null;
    res.status(200).json({ success: true });
});

module.exports = router;
