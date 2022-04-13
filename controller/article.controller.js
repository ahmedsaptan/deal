const Article = require("../models/Article.model");
const Comment = require("../models/Comment.model");
const ThumbsUpModel = require("../models/ThumbsUp.model");
const ThumbsDownModel = require("../models/ThumbsDown.model");
const Author = require("../models/Author.model");
const createError = require("http-errors");


const createArticle = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}

const listArticle = async (req, res, next) => {

}





module.exports = {
    createArticle,
    listArticle
}