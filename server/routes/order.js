const moment = require("moment");

const router = require("express").Router();
const Order = require("../models/Order");

router.post("/createOrder", async (req, res) => {
    try {
        const order = req.body;
        console.log(order);
        const newOrder = await new Order({
            orderItems: order.items,
            total: order.total,
            payment: order.payment,
        });
        const result = await newOrder.save();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
});

router.get("/recentorders", async (req, res) => {
    const yesterday = moment().subtract(1, "days").toDate();
    const result = await Order.find({
        createdAt: { $lt: Date.now(), $gt: yesterday },
    })
        .limit(5)
        .sort({ createdAt: -1 })
        .exec();
    res.status(200).json(result);
});

module.exports = router;
