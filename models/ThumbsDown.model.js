const mongoose = require("mongoose");
const { Schema } = mongoose;

const thumbsDownSchema = new Schema(
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

const ThumbsDownModel = mongoose.model("ThumbsDownModel", thumbsDownSchema);
module.exports = ThumbsDownModel;
