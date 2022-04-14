const express = require("express");
const router = express.Router();
const {
  register,
  login,
  validateOnLogin,
  validateOnRegister,
} = require("../controller/auth.controller");

/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     summary: login user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: user email.
 *                 example: a@g.com
 *               password:
 *                 type: string
 *                 description: user password.
 *                 example: pass1256
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 author:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     email:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *                     jobTitle:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *                     articles:
 *                       type: array
 */

router.post("/login", validateOnLogin(), login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: regiser user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: user email.
 *                 example: a@g.com
 *               password:
 *                 type: string
 *                 description: user password.
 *                 example: pass1256
 *               name:
 *                 type: string
 *                 description: user name.
 *                 example: pass1256
 *               jobTitle:
 *                 type: string
 *                 description: user jobTile.
 *                 example: pass1256
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 author:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     email:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *                     jobTitle:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *                     articles:
 *                       type: array
 */
router.post("/register", validateOnRegister(), register);

module.exports = router;
