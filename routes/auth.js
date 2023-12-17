/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../app/models/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../app/models/User'
 *       500:
 *         description: Server error
 * /api/auth/login:
 *   post:
 *     summary: Login 
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../app/models/User'
 *     responses:
 *       200:
 *         description: The book response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '../app/models/User'
 *       404:
 *         description: The book was not found
 * /api/auth/:uid/editPassword:
 *   put:
 *    summary: Update Password
 *    tags: [Authentication]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The User id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '../app/models/User'
 *    responses:
 *      200:
 *        description: Password change successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '../app/models/User'
 *      404:
 *        description: The user is not valid
 *      500:
 *        description: Server error
 * /api/auth/:uid/logout:
 *   post:
 *     summary: Logout 
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../app/models/User'
 *     responses:
 *       200:
 *         description: Logout
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '../app/models/User'
 *       404:
 *         description: Error
 */

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
