const express = require("express");
import homecontroller from "../app/controllers/homecontroller";
import roomController from "../app/controllers/roomcontroller"
import middlewareController from "../app/middleware/middlewareController";

const router = express.Router();

router.get("/", roomController.roomView)
router.post("/", roomController.creatNewRoom);
router.put("/:rid", roomController.editRoom);
router.delete("/:rid", roomController.deleteRoom);

// router.get("/", usersController.get);

module.exports = router;
