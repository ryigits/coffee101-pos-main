const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        items: {
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
            enum: ["cash", "credit"],
        },
        location: {
            type: String,
            required: true,
            enum: ["odtu", "yuzyil"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
