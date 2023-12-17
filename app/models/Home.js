const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Home = new Schema(
    {
        user_id_list: [String],
        address: { type: String, required: true },
        home_name: { type: String, required: true },
        owner: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Home", Home);
