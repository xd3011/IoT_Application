/**
 * @swagger
 * /api/device/:uid:
 *   get:
 *     summary: Get Device
 *     tags: [Device]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../app/models/Device'
 *     responses:
 *       200:
 *         description: Get Device Successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../app/models/Device'
 *       500:
 *         description: Server error
 * /api/device/:uid/:hid:
 *   get:
 *     summary: Get Device Detail 
 *     tags: [Device]
 *     parameters:
 *      - in: path
 *        name: uid
 *        schema:
 *          type: string
 *        required: true
 *        description: The User id
 *      - in: path
 *        name: did
 *        schema:
 *          type: string
 *        required: true
 *        description: The Device id
 *     responses:
 *       200:
 *         description: Get Device Detail Successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../app/models/Device'
 *       404:
 *         description: Error
 *   post:
 *    summary: Edit Device
 *    tags: [Device]
 *    parameters:
 *      - in: path
 *        name: uid
 *        schema:
 *          type: string
 *        required: true
 *        description: The User id
 *      - in: path
 *        name: did
 *        schema:
 *          type: string
 *        required: true
 *        description: The Device id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '../app/models/Device'
 *    responses:
 *      200:
 *        description: Device edit successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '../app/models/Device'
 *      404:
 *        description: The home is not valid
 *      500:
 *        description: Server error
 *   delete:
 *     summary: Delete Device
 *     tags: [Device]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The User id
 *       - in: path
 *         name: did
 *         schema:
 *           type: string
 *         required: true
 *         description: The Device id
 *     responses:
 *      200:
 *        description: Delete Device successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '../app/models/Device'
 *      404:
 *        description: The device is not valid
 *      500:
 *        description: Server error
 * /api/device/:uid/resgister:
 *   post:
 *     summary: Register Device 
 *     tags: [Device]
 *     parameters:
 *      - in: path
 *        name: uid
 *        schema:
 *          type: string
 *        required: true
 *        description: The User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../app/models/Device'
 *     responses:
 *       200:
 *         description: Register Device Successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../app/models/Device'
 *       404:
 *         description: Error
 */


const express = require("express");
const router = express.Router();

const deviceController = require("../app/controllers/servers/deviceController");
const middlewareController = require("../app/middlewares/middlewareController");

router.post("/:uid/:hid/register", middlewareController.verifyTokenAndCheckIsUser, deviceController.register);

router.put("/:uid/:hid/:did", middlewareController.verifyTokenAndCheckIsUser, deviceController.edit);

router.delete("/:uid/:hid/:did", middlewareController.verifyTokenAndCheckIsUser, deviceController.delete);

router.get("/:uid/:hid", middlewareController.verifyTokenAndCheckIsUser, deviceController.view);

router.get("/:uid/:hid/:did", middlewareController.verifyTokenAndCheckIsUser, deviceController.viewDetail);

module.exports = router;
