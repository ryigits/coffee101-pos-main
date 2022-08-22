const router = require("express").Router();
const Product = require("../models/Product");

//Create a new Product
router.post("/createProduct", async (req, res) => {
    try {
        const newProduct = await new Product({
            title: req.body.title,
            size: req.body.size,
            price: req.body.price,
        });
        const product = await newProduct.save();
        res.status(200).json(product);
    } catch (err) {
        console.log(err);
    }
});

//Delete Product
router.delete("/deleteProduct", async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({
            title: req.body.title,
        });
        product && res.status(200).json(`Product ${req.body.title} has been Deleted`);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
