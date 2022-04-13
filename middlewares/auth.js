const jwt = require("jsonwebtoken");
const { JWT_SECURE } = process.env;
const createError = require("http-errors");
const Author = require("../models/Author.model");
const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    console.log({
      token,
    });
    const tokenValue = token.split(" ")[1];
    const decoded = jwt.verify(tokenValue, JWT_SECURE);

    const userId = decoded.data;
    const author = await Author.findById(userId);

    if (!author) {
      return next(createError.Unauthorized());
    }
    req.currentUser = author;
    next();
  } catch (error) {
    return next(createError.Unauthorized());
  }
};

module.exports = {
  auth,
};
