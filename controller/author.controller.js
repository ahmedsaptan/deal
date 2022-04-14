const Article = require("../models/Article.model");
const Comment = require("../models/Comment.model");
const ThumbsUpModel = require("../models/ThumbsUp.model");
const ThumbsDownModel = require("../models/ThumbsDown.model");
const Author = require("../models/Author.model");
const createError = require("http-errors");
const { body } = require("express-validator");
const checkValidations = require("./../helper/checkMethod");

const listAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.send({
      authors,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listAuthors,
};
