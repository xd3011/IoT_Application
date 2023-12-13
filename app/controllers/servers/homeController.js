const Home = require("../../models/Home");
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const { mutipleMongooseToObject, mongooseToObject } = require("../../util/mongoose");

class homeController {
    // POST localhost:[port]/api/home/user/register
    async create(req, res, next) {
        const home = new Home({
            address: req.body.address,
            home_name: req.body.home_name,
            owner: req.body.uid,
            user_id_list: req.body.uid,
        });
        try {
            await home.save();
            return res.send("Create home successfully");
        } catch (err) {
            console.error("Error saving home:", err);
            return res.status(500).send("New creation failed");
        }
    }

    // GET localhost:[port]/api/home/:slug
    async view(req, res, next) {
        // const formData = req.body;
        Home.find({ user_id_list: req.params.uid })
            .then((home) => {
                console.log(req.params.uid);
                if (!home.length) {
                    return res.status(401).send("You don't have a house, do you want more house?");
                }
                return res.status(200).json(home);
            })
            .catch(next);
    }

    async delete(req, res, next) {
        try {
            await Home.findByIdAndDelete(req.params.hid)
                .then((home) => {
                    if (home) {
                        return res.status(200).json({
                            errCode: 0,
                            errMessaging: "Successfully delete"
                        });
                    } else {
                        return res.status(404).json({
                            errCode: 1,
                            errMessaging: "Not found"
                        })
                    }
                })
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async edit(req, res, next) {
        Home.updateOne({ _id: req.params.hid }, req.body)
            .then((home) => {
                if (home.modifiedCount) {
                    return res.status(200).json({
                        errCode: 0,
                        errMessaging: "Successfully Update"
                    });
                } else {
                    return res.status(404).json({
                        errCode: 1,
                        errMessaging: "Not found"
                    });
                }
            })
            .catch(next);
    }

    async addUser(req, res) {
        Home.findOne({ _id: req.params.hid })
            .then((home) => {
                home.user_id_list.push(req.body.uid);
                console.log(home);
                home.save();
                return res.status(200).json({
                    "message": "Successfully added user from home"
                })
            })
            .catch((err) => {
                return res.status(404).send("Not Found");
            })
    }

    async deleteUser(req, res) {
        Home.findOne({ _id: req.params.hid })
            .then((home) => {
                home.user_id_list.pop(req.body.uid);
                console.log(home);
                home.save();
                return res.status(200).json({
                    "message": "Successfully removed user from home"
                })
            })
            .catch((err) => {
                return res.status(404).send("Not Found");
            })
    }
}

module.exports = new homeController();
