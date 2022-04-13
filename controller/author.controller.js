const Article = require("../models/Article.model");
const Comment = require("../models/Comment.model");
const ThumbsUpModel = require("../models/ThumbsUp.model");
const ThumbsDownModel = require("../models/ThumbsDown.model");
const Author = require("../models/Author.model");
const createError = require("http-errors");
const { body } = require("express-validator");
const checkValidations = require("./../helper/checkMethod");

const validateOnCreateAuthor = () => {
  return [
    body("name").exists().withMessage("name is required").bail(),
    body("jobTitle").exists().withMessage("jobTitle is required").bail(),
  ];
};

const createAuthor = async (req, res, next) => {
    try {
        const body = checkValidations(req);
        
  } catch (error) {
    next(error);
  }
};

const listAuthor = async (req, res, next) => {};

module.exports = {
  createAuthor,
  listAuthor,
  validateOnCreateAuthor,
};
