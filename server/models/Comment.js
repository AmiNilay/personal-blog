const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post', // Creates a reference to the Post model
  },
  // For now, author is a simple string. Later, this could reference the User model.
  author: {
    type: String,
    required: true,
    default: 'Anonymous',
  },
  content: {
    type: String,
    required: [true, 'Please add comment content'],
  },
}, {
  timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;