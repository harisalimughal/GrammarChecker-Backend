// List of allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://grammar-checker-frontend.vercel.app',
  'https://grammar-checker-frontend-git-main-harisalimughals-projects.vercel.app'
];

// CORS options configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
};

// Export the CORS options to be used in server.js
module.exports = corsOptions; 