const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    body:  String,
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;