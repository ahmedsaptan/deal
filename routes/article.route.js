const express = require("express");
const router = express.Router();
const ArticleController = require("../controller/article.controller");
const { auth } = require("../middlewares/auth");
router.get("/", ArticleController.listArticle);
router.get(
  "/:id",
  ArticleController.validateOnParamId(),
  ArticleController.getOneArticle
);
/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
router.use(auth);
router.post(
  "/",
  ArticleController.validateOnCreateArticle(),
  ArticleController.createArticle
);
router.post(
  "/:id/comment",
  ArticleController.validateOnCommentOnArticle(),
  ArticleController.commentInArticle
);
router.patch(
  "/:id/thumbs-up",
  ArticleController.validateOnGetById(),
  ArticleController.thumbsUp
);
router.patch(
  "/:id/thumbs-down",
  ArticleController.validateOnGetById(),
  ArticleController.thumbsDown
);

module.exports = router;
