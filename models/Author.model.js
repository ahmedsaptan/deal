const mongoose = require("mongoose");
const { Schema } = mongoose;

const authorSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: String,
    name: String,
    jobTitle: String,
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
    articlesThumbsUpCount: {
      type: Number,
      default: 0,
    },
    articlesThumbsDownCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
