const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Room = new Schema(
    {
        device_list: [String],
        home_id: { type: String, require: true },
        room_name: { type: String, require: true }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Room", Room);
