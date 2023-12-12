const express = require("express");
const router = express.Router();

const authController = require("../app/controllers/servers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", function (req, res) {
    return res.status(200).json("Test");
});
router.post("/logout", authController.logout);
router.put("/editPassword/:uid", authController.editPassword);

// router.get("/", authController.get);

module.exports = router;
