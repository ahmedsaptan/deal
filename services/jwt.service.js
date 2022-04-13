const jwt = require("jsonwebtoken");
const { JWT_SECURE } = process.env;
const createError = require("http-errors");

const genToken = (userId) => {
  try {
    const token = jwt.sign(
      {
        data: userId,
      },
      JWT_SECURE,
      { expiresIn: "1d" }
    );

    return token;
  } catch (error) {
    return createError.InternalServerError("problem while gen token");
  }
};

module.exports = {
  genToken,
};
