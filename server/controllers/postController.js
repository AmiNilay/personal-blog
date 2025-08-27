const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// @desc    Fetch all posts
// @route   GET /api/posts
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.status(200).json(posts);
});

// @desc    Fetch a single post by ID
// @route   GET /api/posts/:id
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Create a new post
// @route   POST /api/posts
const createPost = asyncHandler(async (req, res) => {
  const { title, content, imageUrl, tags } = req.body;
  if (!title || !content) {
    res.status(400);
    throw new Error('Please provide a title and content.');
  }
  const post = await Post.create({
    title,
    content,
    imageUrl,
    tags,
    user: req.user._id, // Associate post with the logged-in user
  });
  res.status(201).json(post);
});

// @desc    Update an existing post
// @route   PUT /api/posts/:id
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  // We will add logic here later to ensure only the post's author can update it
  const { title, content, imageUrl, tags } = req.body;
  post.title = title || post.title;
  post.content = content || post.content;
  post.imageUrl = imageUrl !== undefined ? imageUrl : post.imageUrl;
  post.tags = tags !== undefined ? tags : post.tags;
  const updatedPost = await post.save();
  res.status(200).json(updatedPost);
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    // We will add logic here later to ensure only the post's author can delete it
    await Comment.deleteMany({ post: req.params.id });
    await post.deleteOne();
    res.status(200).json({ message: 'Post and associated comments removed' });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Get all posts with a specific tag
// @route   GET /api/posts/tag/:tagName
const getPostsByTag = asyncHandler(async (req, res) => {
  const posts = await Post.find({ tags: req.params.tagName }).sort({ createdAt: -1 });
  res.status(200).json(posts);
});

// @desc    Get all comments for a post
// @route   GET /api/posts/:id/comments
const getPostComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: 'desc' });
  res.status(200).json(comments);
});

// @desc    Create a comment for a post
// @route   POST /api/posts/:id/comments
const createPostComment = asyncHandler(async (req, res) => {
  const { author, content } = req.body;
  if (!content) {
    res.status(400);
    throw new Error('Comment content cannot be empty.');
  }
  const comment = await Comment.create({
    post: req.params.id,
    author: author || 'Anonymous',
    content,
  });
  res.status(201).json(comment);
});

// --- THIS IS THE CORRECTED EXPORT BLOCK ---
module.exports = {
  getPosts,
  getPostById, // Was missing
  createPost,
  updatePost,
  deletePost,
  getPostsByTag,
  getPostComments,
  createPostComment,
};