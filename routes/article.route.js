const express = require("express");
const router = express.Router();
const ArticleController = require("../controller/article.controller");
const { auth } = require("../middlewares/auth");
/**
 * @swagger
 *
 * /articles:
 *   get:
 *     summary: list all articles.
 *     parameters:
 *             - in: query
 *               name: searchTerm
 *               schema:
 *                 type: string
 *               description: the string you want to search with it
 *             - in: query
 *               name: sortUp
 *               schema:
 *                 type: boolean
 *               description: sortUp if you wan to sort the result with number of thumbs up
 *             - in: query
 *               name: sortDown
 *               schema:
 *                 type: boolean
 *               description: sortDown if you wan to sort the result with number of thumbs up
 *     responses:
 *       200:
 *         description: articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The user ID.
 *                       title:
 *                         type: string
 *                         description: The user's title.
 *                         example: Leanne Graham
 *                       body:
 *                         type: string
 *                         description: The user's body.
 *                       author:
 *                         type: string
 *                         description: The user's jobTitle.
 *                         example: Leanne Graham
 *                       articles:
 *                         type: array
 *                       thumbsUpCount:
 *                         type: number
 *                       thumbsDownCount:
 *                         type: number
 */
router.get("/", ArticleController.listArticle);

/**
 * @swagger
 *
 * /articles/{articleId}:
 *   get:
 *     summary: get article.
 *     parameters:
 *       - in: path
 *         name: articleId
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 article:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: integer
 *                       description: The article ID.
 *                       example: 0
 *                     title:
 *                       type: string
 *                       description: the article title
 *                       example: Leanne Graham
 *                     body:
 *                       type: string
 *                       description: the article body
 *                       example: Leanne Graham
 *                     author:
 *                       type: string
 *                       description: The user's name.
 *                       example: kjhkajgd86adk
 */
router.get(
  "/:id",
  ArticleController.validateOnParamId(),
  ArticleController.getOneArticle
);

router.use(auth);

/**
 * @swagger
 *
 * /articles:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: create article.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: article title.
 *                 example: test
 *               body:
 *                 type: string
 *                 description: article body.
 *                 example: test app
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 article:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: integer
 *                       description: The article ID.
 *                       example: 0
 *                     title:
 *                       type: string
 *                       description: the article title
 *                       example: Leanne Graham
 *                     body:
 *                       type: string
 *                       description: the article body
 *                       example: Leanne Graham
 *                     author:
 *                       type: string
 *                       description: The user's name.
 *                       example: kjhkajgd86adk
 */
router.post(
  "/",
  ArticleController.validateOnCreateArticle(),
  ArticleController.createArticle
);

/**
 * @swagger
 *
 * /articles/{articleId}/comment:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: add comment to article.
 *     parameters:
 *       - in: path
 *         name: articleId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *                 description: comment body.
 *                 example: test app
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: integer
 *                       description: The article ID.
 *                       example: 0
 *                     by:
 *                       type: string
 *                       description: the article title
 *                       example: Leanne Graham
 *                     article:
 *                       type: string
 *                       description: The user's name.
 *                       example: kjhkajgd86adk
 */
router.post(
  "/:id/comment",
  ArticleController.validateOnCommentOnArticle(),
  ArticleController.commentInArticle
);

/**
 * @swagger
 *
 * /articles/{articleId}/thumbs-up:
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     summary: thumbs up comment
 *     parameters:
 *       - in: path
 *         name: articleId
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 up:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: integer
 *                       description: The article ID.
 *                       example: 0
 *                     by:
 *                       type: string
 *                       description: the article title
 *                       example: Leanne Graham
 *                     article:
 *                       type: string
 *                       description: The user's name.
 *                       example: kjhkajgd86adk
 */
router.patch(
  "/:id/thumbs-up",
  ArticleController.validateOnGetById(),
  ArticleController.thumbsUp
);

/**
 * @swagger
 *
 * /articles/{articleId}/thumbs-down:
 *   patch:
 *     security:
 *     summary: thumbs up comment
 *     parameters:
 *       - in: path
 *         name: articleId
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 down:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: integer
 *                       description: The article ID.
 *                       example: 0
 *                     by:
 *                       type: string
 *                       description: the article title
 *                       example: Leanne Graham
 *                     article:
 *                       type: string
 *                       description: The user's name.
 *                       example: kjhkajgd86adk
 */
router.patch(
  "/:id/thumbs-down",
  ArticleController.validateOnGetById(),
  ArticleController.thumbsDown
);

module.exports = router;
