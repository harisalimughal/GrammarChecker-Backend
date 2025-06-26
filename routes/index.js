const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const grammarRoutes = require('./grammar');

router.use('/login', authRoutes);
router.use('/check-grammar', grammarRoutes);

// Backend check
router.get('/', (req, res) => {
  res.send('GrammarChecker Backend is running 🚀');
});

module.exports = router; 