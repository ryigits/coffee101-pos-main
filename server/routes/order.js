// const moment = require("moment");
const Endoftheday = require("../models/Endoftheday");
const router = require("express").Router();
const Order = require("../models/Order");

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
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
});

router.get("/recentorders", async (req, res) => {
    // const yesterday = moment().subtract(1, "days").toDate();
    const result = await Order.find({
        createdAt: { $lt: Date.now() },
        location: req.session.location,
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
            location: req.session.location,
        })
            .limit(3)
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
});

router.get("/currentrevenueyuzyil", async (req, res) => {
    try {
        const lastday = await Endoftheday.find({
            createdAt: { $lt: new Date() },
            location: "yuzyil",
        })
            .sort({
                createdAt: -1,
            })
            .limit(1);
        const currentOrders = await Order.find({
            createdAt: { $gt: lastday[0].createdAt },
            location: "yuzyil",
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

router.get("/currentrevenueodtu", async (req, res) => {
    try {
        const lastday = await Endoftheday.find({
            createdAt: { $lt: new Date() },
            location: "odtu",
        })
            .sort({
                createdAt: -1,
            })
            .limit(1);
        const currentOrders = await Order.find({
            createdAt: { $gt: lastday[0].createdAt },
            location: "odtu",
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
            location:"yuzyil"
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
        const lastday = await Endoftheday.find({
            createdAt: { $lt: new Date() },
            location:"yuzyil"
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
                : (obj[item.id] = { ...item });
            return obj;
        }, {});

        const mostSoldArray = Object.values(mergedArray);

        var curveCoffeeGr = mostSoldArray.filter((item)=>item.title.includes("Curve"))
        if(curveCoffeeGr.length>0){
          curveCoffeeGr =  Number(curveCoffeeGr.map((item)=>item.amount * 10).reduce((a,b)=>a+b,0));
        }
        var topCoffeeGr = mostSoldArray.filter((item)=>item.title.includes("Top"));
        if(topCoffeeGr.length>0){
            topCoffeeGr= Number(topCoffeeGr.map((item)=>item.amount * 20).reduce((a,b)=>a+b,0));
        }
       var iceCoffeeGr = mostSoldArray.filter((item)=>item.title.includes("Ice"));
       if(iceCoffeeGr.length>0){
        iceCoffeeGr = Number(iceCoffeeGr.map((item)=>item.amount * 20).reduce((a,b)=>a+b,0));
       }
       var coldBrewCoffeeGr = mostSoldArray.filter((item)=>item.title.includes("Brew"));
       if(coldBrewCoffeeGr.length > 0) {
        coldBrewCoffeeGr = Number(coldBrewCoffeeGr.map((item)=>item.amount * 30).reduce((a,b)=>a+b,0));
       }
       var totalCoffeeConsumeGr = await  curveCoffeeGr + topCoffeeGr + iceCoffeeGr + coldBrewCoffeeGr;

        res.status(200).json(totalCoffeeConsumeGr);
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;
