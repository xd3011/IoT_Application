const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Device = new Schema(
    {
        device_owner: { type: String, require: true },
        home_id: { type: String, require: true },
        mac_address: { type: String, required: true },
        device_name: { type: String, required: true },
        device_online: { type: Boolean },
        device_status: {
            code: { type: String },
            value: { type: String },
            type: { type: String },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Device", Device);
