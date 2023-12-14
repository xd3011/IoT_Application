const Device = require("../../models/Device");
// const { mutipleMongooseToObject, mongooseToObject } = require("../../util/mongoose");

class deviceController {
    // POST localhost:[port]/api/device/register
    async register(req, res, next) {
        const formData = req.body;
        formData.user_id = req.params.uid
        console.log(formData);
        try {
            const room = new Device(formData);
            room.save();
            res.status(200).json("Register Success");
        } catch (err) {
            console.error("Error saving room:", err);
            res.status(500).send("New creation failed");
        }
    }

    // POST localhost:[port]/api/:uid/device/:did
    async viewDetail(req, res, next) {
        console.log(req.params.uid, req.params.did);
        Device.find({ user_id: req.params.uid, _id: req.params.did })
            .then((device) => {
                if (!device) {
                    return res.status(401).send("Your user doesn't have a device");
                }
                console.log(device);
                res.status(200).json(device);
            })
            .catch(next);
    }

    // POST localhost:[port]/api//:uid/device
    async view(req, res, next) {
        Device.find({ user_id: req.params.uid })
            .then((device) => {
                if (!device) {
                    return res.status(401).send("Your user doesn't have a device");
                }
                res.status(200).json(device);
            })
            .then(() => {
                res.cookie("uid", req.params.uid, {
                    httpOnly: true,
                    path: "/",
                    sameSite: "strict",
                    secure: false,
                });
            })
            .catch(next);
    }

    async delete(req, res, next) {
        try {
            const device = await Device.findOne({ _id: req.params.did });
            if (!device) {
                return res.status(401).json("The device with the above id does not exist");
            }
            await Device.findByIdAndDelete(req.params.did);
            res.status(200).json("Delete Successfully!");
        } catch (err) {
            return res.status(500).json(error);
        }
    }

    async edit(req, res, next) {
        Device.updateOne({ _id: req.params.did }, req.body)
            .then(async () => {
                res.status(200).json("Update Successfully!");
            })
            .catch(next);
    }
}

module.exports = new deviceController();
