const mongoose = require("mongoose");

const AllRevenuesSchema = new mongoose.Schema(
    {
        tarih: { type: String },
        gerceklesenCiro: {
            type: Number,
            required: true,
        },
        hesaplananCiro: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("AllRevenues", AllRevenuesSchema);
