const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            unique: true,
        },
        size: {
            type: Number,
            enum: [1, 2],
        },
        price: {
            type: Number,
            require: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
