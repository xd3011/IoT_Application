const express = require("express");
const router = express.Router();

const deviceController = require("../app/controllers/deviceController");

router.post("/register", deviceController.register);

router.put("/:did", deviceController.edit);

router.delete("/:did", deviceController.delete);

router.get("/:uid", deviceController.view);

module.exports = router;
