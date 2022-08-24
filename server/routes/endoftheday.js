const router = require("express").Router();
const Endoftheday = require("../models/Endoftheday");
// const {calculateCiro} = require("../helpers");
const nodemailer = require("nodemailer");
const MAIL_SECRET =
    process.env.MAIL_SECRET || require("../secrets.json").MAIL_SECRET;

router.post("/end", async (req, res) => {
    try {
        const calculateCiro = (lastday, currentday) => {
            if (!lastday) {
                return (
                    +currentday.kasadancikis +
                    +currentday.kasafix +
                    +currentday.finansbank +
                    +currentday.harcama
                );
            }
            return (
                +currentday.kasadancikis +
                +currentday.kasafix +
                +currentday.finansbank +
                +currentday.harcama -
                lastday.kasafix
            );
        };

        const currentday = req.body;
        const lastday = await Endoftheday.find({
            createdAt: { $lt: currentday.time },
        })
            .sort({
                createdAt: -1,
            })
            .limit(1);
        console.log(lastday);
        const _currentday = await new Endoftheday({
            tarih: new Date(currentday.time).toString().slice(0, 24),
            finansbank: currentday.finansbank,
            kasadancikis: currentday.kasadancikis,
            cikisyapan: currentday.cikisyapan,
            harcama: currentday.harcama,
            kasafix: currentday.kasafix,
            ciro: calculateCiro(lastday[0], currentday),
        });
        const endoftheday = await _currentday.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ygtsez",
                pass: MAIL_SECRET,
            },
        });

        const mailData = {
            from: "ygtsez@gmail.com",
            to: `ryigit@gmail.com`,
            subject: "Coffee101 Yuzyil Daily Revenue",
            html: `<p style="color:orange;font-size:25px;">${new Date(
                currentday.time
            )
                .toString()
                .slice(
                    0,
                    15
                )} Daily Revenue => </p> <p style="color:red;font-size:25px;">${
                endoftheday.ciro
            } TL </p> `,
        };

        await transporter.sendMail(mailData, function (err) {
            if (err) {
                console.log(
                    "%cregister.js line:36 err",
                    "color: #007acc;",
                    err
                );
            } else {
                console.log("mail created");
            }
        });

        res.status(200).json(endoftheday);
    } catch (err) {
        console.log(err);
    }
});

router.get("/last", async (req, res) => {
    const lastday = await Endoftheday.find({
        createdAt: { $lt: new Date() },
    })
        .sort({
            createdAt: -1,
        })
        .limit(1);
    res.status(200).json(lastday[0]);
});

module.exports = router;
