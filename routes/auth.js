// Import required modules
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const users = require('../config/users'); // User data
const JWT_SECRET = process.env.JWT_SECRET; // JWT secret key

// POST endpoint for user login
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body; // Extract credentials from request body
    if (!username || !password) {
      // If missing credentials, return error
      return res.status(400).json({ error: 'Username and password required' });
    }
    // Find user by username
    const user = users.find(u => u.username === username);
    if (!user) {
      // If user not found, return error
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Compare provided password with stored hash
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      // If password is invalid, return error
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Generate JWT token for authenticated user
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    // Respond with token and user info
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    // Handle errors and log them
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router to be used in index.js
module.exports = router; 