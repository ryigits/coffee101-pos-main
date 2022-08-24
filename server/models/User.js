const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            min: 3,
            max: 40,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            min: 6,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
