const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostsByTag,
  getPostComments,
  createPostComment,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

// --- PUBLIC ROUTES ---
// ANYONE can get all posts or a single post.
router.route('/').get(getPosts); // <-- THIS IS THE FIX
router.route('/:id').get(getPostById);
router.route('/tag/:tagName').get(getPostsByTag);
router.route('/:id/comments').get(getPostComments).post(createPostComment);


// --- PROTECTED "ADMIN" ROUTES ---
// You MUST be logged in to create, update, or delete a post.
router.route('/').post(protect, createPost);
router.route('/:id').put(protect, updatePost).delete(protect, deletePost);

module.exports = router;