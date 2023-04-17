const mongoose = require("mongoose");

const CoffeeConsumeSchema = new mongoose.Schema(
    {
        gr: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("CoffeeConsume", CoffeeConsumeSchema);
