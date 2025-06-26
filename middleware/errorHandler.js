// Error handling middleware for Express
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log error stack trace
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error' // Send error message to client
  });
};

// Export the error handler to be used in server.js
module.exports = errorHandler; 