const express = require("express");
const router = express.Router();

const authController = require("../app/controllers/authcontroller");
import firebaseController from "../app/controllers/firebasecontroller";

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refreshfbtktimestamp/:uid", firebaseController.refreshFBTokenTimeStamp)
router.post("/refresh", function (req, res) {
    return res.status(200).json("Test");
});
router.post("/logout", function (req, res) {
    return res.status(200).json("Test");
});
router.put("/editPassword/:uid", authController.editPassword);

// router.get("/", authController.get);

module.exports = router;
