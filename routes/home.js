/**
 * @swagger
 * /api/home/:hid:
 *   get:
 *     summary: Get Home
 *     tags: [Home]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../app/models/Home'
 *     responses:
 *       200:
 *         description: Get Home Successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../app/models/Home'
 *       500:
 *         description: Server error
 * /api/home/:uid/create-home:
 *   post:
 *     summary: Register 
 *     tags: [Home]
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
 *             $ref: '../app/models/Home'
 *     responses:
 *       200:
 *         description: Create Home Successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../app/models/Home'
 *       404:
 *         description: Error
 * /api/home/:uid/edit/:hid:
 *   put:
 *    summary: Edit Home
 *    tags: [Home]
 *    parameters:
 *      - in: path
 *        name: uid
 *        schema:
 *          type: string
 *        required: true
 *        description: The User id
 *      - in: path
 *        name: hid
 *        schema:
 *          type: string
 *        required: true
 *        description: The Home id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '../app/models/Home'
 *    responses:
 *      200:
 *        description: Home change successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '../app/models/Home'
 *      404:
 *        description: The home is not valid
 *      500:
 *        description: Server error
 * /api/home/:uid/delete/:hid:
 *   delete:
 *     summary: Delete Home
 *     tags: [Home]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The User id
 *       - in: path
 *         name: hid
 *         schema:
 *           type: string
 *         required: true
 *         description: The Home id
 *     responses:
 *      200:
 *        description: Delete Home successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '../app/models/Home'
 *      404:
 *        description: The home is not valid
 *      500:
 *        description: Server error
 * /api/home/:uid/members/:hid:
 *   post:
 *     summary: Add Member 
 *     tags: [Home]
 *     parameters:
 *      - in: path
 *        name: uid
 *        schema:
 *          type: string
 *        required: true
 *        description: The User id
 *      - in: path
 *        name: hid
 *        schema:
 *          type: string
 *        required: true
 *        description: The Home id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../app/models/Home'
 *     responses:
 *       200:
 *         description: Add User Successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../app/models/Home'
 *       404:
 *         description: Error
 *   delete:
 *     summary: Remove Home
 *     tags: [Home]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The User id
 *       - in: path
 *         name: hid
 *         schema:
 *           type: string
 *         required: true
 *         description: The Home id
 *     responses:
 *      200:
 *        description: Remove Home successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '../app/models/Home'
 *      404:
 *        description: The home is not valid
 *      500:
 *        description: Server error
 * /api/home/:uid/remove-members/:hid:
 *   delete:
 *     summary: Delete Member in Home
 *     tags: [Home]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The User id
 *       - in: path
 *         name: hid
 *         schema:
 *           type: string
 *         required: true
 *         description: The Home id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '../app/models/Home'
 *     responses:
 *      200:
 *        description: Delete Home successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '../app/models/Home'
 *      404:
 *        description: The home is not valid
 *      500:
 *        description: Server error
 */


const express = require("express");
const homeController = require("../app/controllers/servers/homeController");
const router = express.Router();
const middlewareController = require("../app/middlewares/middlewareController");

router.post("/:uid/members/:hid", middlewareController.verifyTokenAndOwnerAuth, homeController.addUser);

router.delete("/:uid/members/:hid", middlewareController.verifyTokenAndOwnerAuth, homeController.deleteUser);

router.delete("/:hid/remove-members/:uid", middlewareController.verifyTokenAndOwnerAuthOrIsUser, homeController.deleteUser);

router.delete("/:uid/delete/:hid", middlewareController.verifyTokenAndOwnerAuth, homeController.delete); // Id is homeId Delete

router.put("/:uid/edit/:hid", middlewareController.verifyTokenAndOwnerAuth, homeController.edit); // Id is homeId Edit

router.post("/:uid/create-home", middlewareController.verifyTokenAndCheckIsUser, homeController.create);

router.get("/:uid", middlewareController.verifyTokenAndCheckIsUser, homeController.view); // Id is userId View

module.exports = router;
