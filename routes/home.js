const express = require("express");
const homeController = require("../app/controllers/homecontroller");
const router = express.Router();
import middlewareController from "../app/middleware/middlewareController";

router.post("/:hid/members", middlewareController.verifyTokenAndOwnerAuth, homeController.addUser);

router.delete("/:hid/members/:uid", middlewareController.verifyTokenAndOwnerAuth, homeController.deleteUser);

router.delete("/:hid/remove-members/:uid", middlewareController.verifyTokenAndOwnerAuthOrIsUser, homeController.deleteUser);

router.delete("/delete/:hid", middlewareController.verifyTokenAndOwnerAuth, homeController.delete); // Id is homeId Delete

router.put("/:hid", middlewareController.verifyTokenAndOwnerAuth, homeController.edit); // Id is homeId Edit

router.post("/create-home", middlewareController.verifyToken, homeController.create);

router.get("/:uid", middlewareController.verifyTokenAndCheckIsUser, homeController.view); // Id is userId View

module.exports = router;
