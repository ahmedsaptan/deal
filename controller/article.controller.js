const Article = require("../models/Article.model");
const Comment = require("../models/Comment.model");
const ThumbsUpModel = require("../models/ThumbsUp.model");
const ThumbsDownModel = require("../models/ThumbsDown.model");
const Author = require("../models/Author.model");
const createError = require("http-errors");
const { body, param } = require("express-validator");
const { checkValidations } = require("../helper/checkMethod");

const validateOnCreateArticle = () => {
  return [
    body("title").exists().withMessage("title is required").bail(),
    body("body").exists().withMessage("body is required").bail(),
  ];
};

const createArticle = async (req, res, next) => {
  try {
    const body = checkValidations(req);
    const currentUser = req.currentUser;

    const article = new Article({
      ...body,
      author: currentUser._id,
    });

    await article.save();
    res.send({
      article,
    });
  } catch (error) {
    next(error);
  }
};

const validateOnParamId = () => {
  return [
    param("id")
      .exists()
      .withMessage("id is required")
      .bail()
      .isMongoId()
      .withMessage("id must be mongoID"),
  ];
};
const getOneArticle = async (req, res, next) => {
  try {
    checkValidations(req);
    const articleId = req.params.id;
    const article = await Article.findById(articleId);
    if (!article) {
      throw createError.NotFound("article not found");
    }
    res.send({
      article,
    });
  } catch (error) {
    next(error);
  }
};

const listArticle = async (req, res, next) => {
  try {
    checkValidations(req);
    const articles = await Article.find();
    res.send({
      articles,
    });
  } catch (error) {}
};

const validateOnCommentOnArticle = () => {
  return [
    param("id")
      .exists()
      .withMessage("id is required")
      .bail()
      .isMongoId()
      .withMessage("id must be mongoID")
      .bail()
      .custom(async (value, { req }) => {
        const article = await Article.findById(value);
        if (!article) {
          throw createError.NotFound("article not found");
        }
        req.existArticle = article;
        return true;
      }),
    body("body").exists().withMessage("comment body is required").notEmpty(),
  ];
};
const commentInArticle = async (req, res, next) => {
  try {
    const body = checkValidations(req);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createArticle,
  listArticle,
  validateOnCreateArticle,
  validateOnParamId,
  getOneArticle,
  validateOnCommentOnArticle,
  commentInArticle,
};
