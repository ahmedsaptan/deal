const bcrypt = require("bcryptjs");
const Author = require("../models/Author.model");
const { body } = require("express-validator");
const { checkValidations } = require("../helper/checkMethod");
const createError = require("http-errors");
const { genToken } = require("../services/jwt.service");

const register = async (req, res, next) => {
  try {
    let body = checkValidations(req);
    body.email = body.email.trim().toLowerCase();
    const hash = bcrypt.hashSync(body.password, 10);

    const bodyData = {
      ...body,
      password: hash,
    };
    const author = new Author(bodyData);
    await author.save();

    author.password = undefined;

    const token = await genToken(author._id);
    return res.status(201).send({
      author,
      token,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    let body = checkValidations(req);
    const author = req.author;
    console.log(author);
    const match = await bcrypt.compare(body.password, author.password);

    if (match) {
      author.password = undefined;

      const token = await genToken(author._id);
      return res.send({
        author,
        token,
      });
    } else {
      throw createError.Unauthorized();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const validateOnRegister = () => {
  return [
    body("email")
      .exists()
      .withMessage("email Is Required")
      .bail()
      .notEmpty()
      .withMessage("email can't be empty")
      .bail()
      .trim()
      .isEmail()
      .withMessage("Invalid email")
      .bail()
      .custom(async (value) => {
        let email = value.toLowerCase().trim();
        const userExist = await Author.findOne({
          email,
        });
        if (userExist) {
          throw createError(400, "email Already Exist");
        }
        return true;
      })
      .bail(),
    body("name")
      .exists()
      .withMessage("name Is Required")
      .bail()
      .notEmpty()
      .trim()
      .withMessage("name Can't be Empty")
      .bail(),
    body("password")
      .exists()
      .withMessage("password Is Required")
      .notEmpty()
      .withMessage("password can't be empty")
      .bail()
      .isLength({ min: 8 })
      .withMessage("password Min Length is 5")
      .bail(),
    body("jobTitle")
      .exists()
      .withMessage("jobTitle is required")
      .bail()
      .notEmpty()
      .withMessage("jobTitle can't be empty")
      .bail(),
  ];
};

const validateOnLogin = () => {
  return [
    body("email")
      .exists()
      .withMessage("email is required")
      .bail()
      .notEmpty()
      .withMessage("email can't be empty")
      .bail()
      .isEmail()
      .withMessage("invalid email")
      .custom(async (value, { req }) => {
        try {
          const author = await Author.findOne({
            email: value,
          });
          if (!author) {
            throw new createError(404, "author not found");
          }

          req.author = author;
          return true;
        } catch (e) {
          throw e;
        }
      }),
    body("password")
      .exists()
      .withMessage("password is required")
      .bail()
      .notEmpty()
      .withMessage("password can't be empty")
      .bail(),
  ];
};

module.exports = {
  register,
  login,
  validateOnLogin,
  validateOnRegister,
};
