const Endoftheday = require("../models/Endoftheday");
const router = require("express").Router();
const Order = require("../models/Order");
const { currentRevenue, coffeeConsume } = require("../helpers");

router.post("/createOrder", async (req, res) => {
    try {
        const order = req.body;
        const newOrder = await new Order({
            items: order.items,
            total: order.total,
            payment: order.payment,
            location: req.session.location,
        });
        const result = await newOrder.save();
        result && res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
        console.log(err);
    }
});

router.get("/recentorders", async (req, res) => {
    // const yesterday = moment().subtract(1, "days").toDate();
    const result = await Order.find({
        createdAt: { $lt: Date.now() },
        location: req.session.location,
    })
        .limit(5)
        .sort({ createdAt: -1 })
        .exec();
    res.status(200).json(result);
});

router.post("/deleteorder", async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.body.id);
        //new recent Orders
        // const yesterday = moment().subtract(1, "days").toDate();
        const result = await Order.find({
            createdAt: { $lt: Date.now() },
            location: req.session.location,
        })
            .limit(5)
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
});

router.get("/currentrevenueyuzyil", async (req, res) => {
    try {
        const result = await currentRevenue("yuzyil");
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
});

router.get("/currentrevenueodtu", async (req, res) => {
    try {
        const result = await currentRevenue("odtu");
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
});

router.get("/mostsold", async (req, res) => {
    try {
        const lastday = await Endoftheday.find({
            createdAt: { $lt: new Date() },
            location: "yuzyil",
        })
            .sort({
                createdAt: -1,
            })
            .limit(1);
        const currentOrders = await Order.where("createdAt").gt(
            lastday[0].createdAt
        );
        /// odtu kapanisi ayikladim.
        const _soldArray = currentOrders.map((order) => order.items).flat();

        const mergedArray = _soldArray.reduce((obj, item) => {
            obj[item.id]
                ? (obj[item.id].amount += item.amount)
                : (obj[item.id] = { ...item });
            return obj;
        }, {});

        const mostSoldArray = Object.values(mergedArray);

        res.status(200).json(mostSoldArray);
    } catch (err) {
        console.log(err);
    }
});

router.get("/coffeeconsume", async (req, res) => {
    try {
        const result = await coffeeConsume();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;
