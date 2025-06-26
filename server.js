// Import required modules
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000; // Set server port

// Import custom modules and middleware
const corsOptions = require('./utils/corsOptions'); // CORS configuration
const routes = require('./routes'); // Main routes
const errorHandler = require('./middleware/errorHandler'); // Error handling middleware

// Enable CORS with specified options
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json()); // Parse incoming JSON requests

// Register main routes
app.use('/', routes);

// Register error handling middleware (should be after all other app.use calls)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});