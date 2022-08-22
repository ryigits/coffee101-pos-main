const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        orderItems: {
            type: [Object],
            default: [],
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        payment: {
            type: String,
            enum:["cash","credit"]
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
