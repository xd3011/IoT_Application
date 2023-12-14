const express = require("express");
const router = express.Router();

const deviceController = require("../app/controllers/servers/deviceController");

router.post("/:uid/register", deviceController.register);

router.put("/:did", deviceController.edit);

router.delete("/:did", deviceController.delete);

router.get("/:uid", deviceController.view);

router.get("/:uid/device/:did", deviceController.viewDetail);

module.exports = router;
