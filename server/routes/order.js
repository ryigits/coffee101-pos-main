const router = require("express").Router();
const Order = require("../models/Order");

router.post("/createOrder", async (req, res) => {
    try {
        const order = req.body;
        console.log(order);
        const newOrder = await new Order({
            orderItems: order.items,
            total: order.total,
            payment:order.payment
        });
        const result = await newOrder.save();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
});

router.get("/orders", async (req, res) => {});

module.exports = router;
