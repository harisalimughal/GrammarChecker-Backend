// Import OpenAI library
const OpenAI = require('openai');
// Create an OpenAI API instance with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Export the OpenAI instance to be used in grammar.js
module.exports = openai; 