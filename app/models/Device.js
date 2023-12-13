const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Device = new Schema(
    {
        user_id: { type: String, require: true },
        mac_address: { type: String, required: true },
        device_name: { type: String, required: true },
        device_type: { type: String },
        device_state: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Device", Device);
