const router = require("express").Router();
const Endoftheday = require("../models/Endoftheday");
const {
    currentRevenue,
    calculateCiro,
    sendInfoMailDailyRevenue,
    saveAllRevenues,
    coffeeConsume,
    saveCoffeeConsume
} = require("../helpers");

router.post("/end", async (req, res) => {
    try {
        const currentday = req.body;
        const { location } = req.session;
        let todayCoffeeConsume = null;
        const calculatedRevenue = await currentRevenue(location);

        if (location === "yuzyil") {
            currentday.ziraatbank = 0;
            todayCoffeeConsume = await coffeeConsume();
        }
        const lastday = await Endoftheday.find({
            createdAt: { $lt: currentday.time },
            location: location,
        })
            .sort({
                createdAt: -1,
            })
            .limit(1);
        const _currentday = await new Endoftheday({
            tarih: new Date(currentday.time).toString().slice(0, 24),
            finansbank: currentday.finansbank,
            ziraatbank: currentday.ziraatbank,
            kasadancikis: currentday.kasadancikis,
            cikisyapan: currentday.cikisyapan,
            harcama: currentday.harcama,
            kasafix: currentday.kasafix,
            ciro: calculateCiro(lastday[0], currentday),
            location: location,
        });
        const endoftheday = await _currentday.save();

        // info side
        sendInfoMailDailyRevenue(
            currentday,
            endoftheday,
            location,
            calculatedRevenue,
            todayCoffeeConsume
        );
        saveCoffeeConsume(todayCoffeeConsume);
        saveAllRevenues(currentday, endoftheday, location, calculatedRevenue);

        res.status(200).json(endoftheday);
    } catch (err) {
        console.log(err);
    }
});

router.get("/last", async (req, res) => {
    const lastday = await Endoftheday.find({
        createdAt: { $lt: new Date() },
        location: req.session.location,
    })
        .sort({
            createdAt: -1,
        })
        .limit(1);

    res.status(200).json(lastday[0]);
});

module.exports = router;
