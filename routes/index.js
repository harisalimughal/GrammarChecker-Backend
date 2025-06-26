// Import Express and create a router instance
const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const grammarRoutes = require('./grammar');

// Mount authentication routes at /login
router.use('/login', authRoutes);
// Mount grammar checking routes at /check-grammar
router.use('/check-grammar', grammarRoutes);

// Health check endpoint for backend
router.get('/', (req, res) => {
  res.send('GrammarChecker Backend is running 🚀');
});

// Export the router to be used in server.js
module.exports = router; 