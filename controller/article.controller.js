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

    currentUser.articles.push(article._id);

    const [] = await Promise.all([article.save(), currentUser.save()]);
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

// const t = () => {
//      try {
//     const body = checkValidations(req);
//     const user = req.user;
//     const isStudent = user.role === "student";
//     let enrolledSection;
//     let enrolledCourses;
//     let query = {
//       active: true,
//     };
//     let sortQuery = { order: 1 };
//     const {
//       searchTerm,
//       sortColumn,
//       sortDirection,
//       sectionId,
//       active,
//       courseName,
//       quizes,
//     } = req.query;
//     if (searchTerm && searchTerm !== "null" && searchTerm !== "undefined") {
//       query.$or = [{ name: { $regex: searchTerm, $options: "i" } }];
//     }

//     let populate = null;
//     if (courseName === "true" || courseName === true) {
//       populate = {
//         path: "sectionId",
//         select: "name",
//       };
//       console.log(populate);
//     }
//     if (
//       active &&
//       (active === "true" ||
//         active === "false" ||
//         active === true ||
//         active === false)
//     ) {
//       query.active = active === "true" || active === true;
//     }

//     if (active && active === "all") {
//       delete query.active;
//     }

//     if (sortColumn) {
//       sortQuery = {};
//       sortQuery[`${sortColumn}`] = sortDirection === "asc" ? 1 : -1;
//     }

//     if (sectionId) {
//       query.sectionId = sectionId;
//     }
//     if (sectionId && isStudent) {
//       // check fot his section
//       enrolledSection = await EnrolledSection.findOne(
//         {
//           user: user._id,
//           section: sectionId,
//         },
//         {},
//         { lean: true }
//       );

//       if (!enrolledSection) {
//         // get all course
//         enrolledCourses = await EnrolledCourse.find(
//           {
//             user: user._id,
//           },
//           {},
//           { lean: true }
//         );
//       }
//     }

//     let courses = await Course.find(query, {}, { lean: true })
//       .sort(sortQuery)
//       .populate({
//         path: "quizes",
//         populate: "questions",
//       })
//       .populate(populate);
//     let count = await Course.countDocuments(query);

//   } catch (e) {
//     console.log(e);
//     next(e);
//   }
// }
const listArticle = async (req, res, next) => {
  try {
    checkValidations(req);
    let query = {};
    let sortQuery = { _id: -1 };
    const { searchTerm } = req.query;
    console.log(searchTerm);
    if (searchTerm && searchTerm !== "null" && searchTerm !== "undefined") {
      query.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { body: { $regex: searchTerm, $options: "i" } },
      ];
    }
    const articles = await Article.find(query).sort(sortQuery);
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
    const { body } = checkValidations(req);
    const article = req.existArticle;
    const currentUser = req.currentUser;
    const comment = new Comment({
      body,
      article: article._id,
      by: currentUser._id,
    });

    await comment.save();
    article.comments.push(comment._id);
    await article.save();
    res.send({
      comment,
      article,
    });
  } catch (error) {
    next(error);
  }
};
const validateOnGetById = () => {
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
  ];
};

const thumbsUp = async (req, res, next) => {
  try {
    const article = req.existArticle;

    const currentUser = req.currentUser;
    const [existDown, existUp] = await Promise.all([
      ThumbsDownModel.findOne({
        author: currentUser._id,
        article: article._id,
      }),
      ThumbsUpModel.findOne({
        author: currentUser._id,
        article: article._id,
      }),
    ]);

    if (existUp) {
      throw createError.BadRequest("author already thumbs up this article");
    }
    // then. remove one from down
    if (existDown) {
      // decrement author of article
      const updateAuthor = await Author.findByIdAndUpdate(article.author, {
        $inc: { articlesThumbsDownCount: -1 },
      });
      article.thumbsDownCount--;
      await existDown.remove();
    }

    const up = new ThumbsUpModel({
      author: currentUser._id,
      article: article._id,
    });

    const updateAuthor = await Author.findByIdAndUpdate(article.author, {
      $inc: { articlesThumbsDownCount: 1 },
    });
    article.thumbsUpCount++;

    await Promise.all([up.save(), article.save()]);

    res.send({
      up,
    });
  } catch (error) {
    next(error);
  }
};
const thumbsDown = async (req, res, next) => {
  try {
    const article = req.existArticle;
    const currentUser = req.currentUser;
    const [existDown, existUp] = await Promise.all([
      ThumbsDownModel.findOne({
        author: currentUser._id,
        article: article._id,
      }),
      ThumbsUpModel.findOne({
        author: currentUser._id,
        article: article._id,
      }),
    ]);

    if (existDown) {
      throw createError.BadRequest("author already thumbs down this article");
    }
    // then. remove one from down
    if (existUp) {
      const updateAuthor = await Author.findByIdAndUpdate(article.author, {
        $inc: { articlesThumbsUpCount: -1 },
      });
      article.thumbsUpCount--;
      await existUp.remove();
    }

    const down = new ThumbsDownModel({
      author: currentUser._id,
      article: article._id,
    });

    const updateAuthor = await Author.findByIdAndUpdate(article.author, {
      $inc: { articlesThumbsDownCount: 1 },
    });
    article.thumbsDownCount++;

    await Promise.all([down.save(), article.save()]);

    res.send({
      down,
    });
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
  thumbsUp,
  thumbsDown,
  validateOnGetById,
};
