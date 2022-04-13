const mongoose = require("mongoose");
const { Schema } = mongoose;

const thumbsUpSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

const ThumbsUpModel = mongoose.model("ThumbsUpModel", thumbsUpSchema);
module.exports = ThumbsUpModel;
