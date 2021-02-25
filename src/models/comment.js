const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: { type: String, required: true },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: { createdAt: 'created_at' } }
);
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;