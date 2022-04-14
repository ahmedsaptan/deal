const mongoose = require("mongoose");
const { Schema } = mongoose;

const thumbsUpSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
  },
  {
    timestamps: true,
  }
);

const ThumbsUpModel = mongoose.model("ThumbsUpModel", thumbsUpSchema);
module.exports = ThumbsUpModel;
