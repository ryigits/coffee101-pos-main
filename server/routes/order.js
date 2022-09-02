// const moment = require("moment");
const Endoftheday = require("../models/Endoftheday");
const router = require("express").Router();
const Order = require("../models/Order");

router.post("/createOrder", async (req, res) => {
    try {
        const order = req.body;
        console.log(order);
        const newOrder = await new Order({
            items: order.items,
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
    // const yesterday = moment().subtract(1, "days").toDate();
    const result = await Order.find({
        createdAt: { $lt: Date.now() },
    })
        .limit(3)
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
        })
            .limit(5)
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
});

router.get("/currentrevenue", async (req, res) => {
    try {
        const lastday = await Endoftheday.find({
            createdAt: { $lt: new Date() },
        })
            .sort({
                createdAt: -1,
            })
            .limit(1);
        const currentOrders = await Order.find({
            createdAt: { $gt: lastday[0].createdAt },
        }).sort({
            createdAt: -1,
        });
        const calculateRevenue = (currentOrders) => {
            return currentOrders.reduce(
                (prev, current) => prev + current.total,
                0
            );
        };

        res.status(200).json(calculateRevenue(currentOrders));
    } catch (err) {
        console.log(err);
    }
});

router.get("/mostsold", async (req, res) => {
    try {
        const lastday = await Endoftheday.find({
            createdAt: { $lt: new Date() },
        })
            .sort({
                createdAt: -1,
            })
            .limit(1);
        const currentOrders = await Order.where("createdAt").gt(
            lastday[0].createdAt
        );

        const _soldArray = currentOrders.map((order) => order.items).flat();

        const mergedArray = _soldArray.reduce((obj, item) => {
            obj[item.id]
                ? (obj[item.id].amount += item.amount)
                : (obj[item.id] = {...item});
            return obj;
        }, {});

        const mostSoldArray = Object.values(mergedArray);

        res.status(200).json(mostSoldArray);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
