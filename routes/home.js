const express = require("express");
const homeController = require("../app/controllers/servers/homeController");
const router = express.Router();
const middlewareController = require("../app/middlewares/middlewareController");

router.post("/:hid/members", middlewareController.verifyTokenAndOwnerAuth, homeController.addUser);

router.delete("/:hid/members/:uid", middlewareController.verifyTokenAndOwnerAuth, homeController.deleteUser);

router.delete("/:hid/remove-members/:uid", middlewareController.verifyTokenAndOwnerAuthOrIsUser, homeController.deleteUser);

router.delete("/:hid/delete", middlewareController.verifyTokenAndOwnerAuth, homeController.delete); // Id is homeId Delete

router.put("/:hid/edit", middlewareController.verifyTokenAndOwnerAuth, homeController.edit); // Id is homeId Edit

router.post("/:uid/create-home", middlewareController.verifyTokenAndCheckIsUser, homeController.create);

router.get("/:uid", middlewareController.verifyTokenAndCheckIsUser, homeController.view); // Id is userId View

module.exports = router;
