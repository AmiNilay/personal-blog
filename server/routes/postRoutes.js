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
const { protect } = require('../middleware/authMiddleware'); // <-- Import the lock

// --- PUBLIC ROUTES (Anyone can access these) ---
router.route('/').get(getPosts);
router.route('/tag/:tagName').get(getPostsByTag);
router.route('/:id').get(getPostById);
router.route('/:id/comments').get(getPostComments).post(createPostComment);

// --- PROTECTED ROUTES (Only a logged-in admin can access these) ---
router.route('/').post(protect, createPost); // <-- Lock applied
router.route('/:id').put(protect, updatePost).delete(protect, deletePost); // <-- Locks applied

module.exports = router;