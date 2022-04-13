const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    tile: String,
    body: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    thumbsUpCount: {
      type: Number,
      default: 0,
    },
    thumbsUpCount: {
      type: Number,
      default: 0,
    },
    
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
