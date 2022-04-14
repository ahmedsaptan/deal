const Author = require("../models/Author.model");

const listAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().select("-password");
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
