const express = require('express');
const router = express.Router();

// Import the placeholder controller functions
const {
  registerUser,
  loginUser,
} = require('../controllers/authController');


// Public route for registering a new user
router.post('/register', registerUser);

// Public route for logging a user in
router.post('/login', loginUser);

module.exports = router;