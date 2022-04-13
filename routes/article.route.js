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

router.use(auth);
router.post(
  "/",
  ArticleController.validateOnCreateArticle(),
  ArticleController.createArticle
);
router.post("/:id/comment", )

module.exports = router;
