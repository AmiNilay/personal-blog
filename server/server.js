const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const { notFound, errorHandler } = require('./middleware/authMiddleware');

// Load environment variables from .env file
dotenv.config();

// Initialize the database connection
connectDB();

// Create the main Express application
const app = express();

// --- Core Middleware ---

// Enable Cross-Origin Resource Sharing (CORS) so your
// React frontend (on port 3000) can talk to this server (on port 5000)
app.use(cors());

// Enable the express.json() middleware to parse incoming JSON payloads
app.use(express.json());


// --- API Routes ---

// All routes related to posts will be handled by postRoutes
app.use('/api/posts', postRoutes);

// All routes related to users/authentication will be handled by authRoutes
app.use('/api/users', authRoutes);


// --- Custom Error Handling Middleware ---

// This middleware will run for any request that doesn't match the routes above (404 Not Found)
app.use(notFound);

// This is the master error handler. If any route handler throws an error,
// it will be caught and processed by this middleware.
app.use(errorHandler);


// --- Start The Server ---

// Define the port the server will listen on.
// It will use the PORT from the .env file, or default to 5000.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  );
});