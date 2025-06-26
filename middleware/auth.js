// Import JWT library
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // JWT secret key

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Get Authorization header
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from header
  if (!token) {
    // If no token, deny access
    return res.status(401).json({ error: 'Access token required' });
  }
  // Verify token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      // If token invalid or expired, deny access
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user; // Attach user info to request
    next(); // Proceed to next middleware or route
  });
};

// Export the middleware to be used in routes
module.exports = authenticateToken; 