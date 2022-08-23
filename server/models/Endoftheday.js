const mongoose = require("mongoose");

const EndofthedaySchema = new mongoose.Schema(
    {
        tarih: { type: String },
        finansbank: {
            type: Number,
            required: true,
        },
        kasadancikis: {
            type: Number,
            required: true,
        },
        cikisyapan: {
            type: String,
            required: true,
        },
        harcama: {
            type: Number,
            required: true,
        },
        kasafix: {
            type: Number,
            required: true,
        },
        ciro: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Endoftheday", EndofthedaySchema);
