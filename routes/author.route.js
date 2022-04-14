const express = require("express");
const router = express.Router();
const AuthorController = require("../controller/author.controller");

/**
 * @swagger
 *
 * /authors:
 *   get:
 *     summary: list all authors.
 *     responses:
 *       200:
 *         description: authors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The user ID.
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 *                       email:
 *                         type: string
 *                         description: The user's email.
 *                       jobTitle:
 *                         type: string
 *                         description: The user's jobTitle.
 *                         example: Leanne Graham
 *                       articles:
 *                         type: array
 *                       articlesThumbsUpCount:
 *                         type: number
 *                       articlesThumbsDownCount:
 *                         type: number
 */
router.get("/", AuthorController.listAuthors);

module.exports = router;
