const Author = require("../models/Author.model");

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
