const mongoose = require('mongoose');

// A Mongoose Schema defines the structure of the document, default values, validators, etc.
const postSchema = new mongoose.Schema(
  {
    // We can add a reference to the User model later to know who created the post
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    title: {
      type: String,
      required: [true, 'Please add a title'], // Custom error message
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please add content'],
    },
    imageUrl: {
      type: String,
      required: false, // This field is optional
    },
  },
  {
    // `timestamps` automatically adds `createdAt` and `updatedAt` fields.
    // This is a Mongoose feature that is extremely useful.
    timestamps: true,
  }
);

// A Mongoose Model provides an interface to the database for creating, querying, updating, deleting records, etc.
const Post = mongoose.model('Post', postSchema);

module.exports = Post;