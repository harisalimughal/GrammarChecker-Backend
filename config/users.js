// Import bcrypt for password hashing
const bcrypt = require('bcryptjs');

// Array of user objects with hashed passwords
const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('password', 10) // Hashed password
  },
  {
    id: 2,
    username: 'user',
    password: bcrypt.hashSync('123456', 10) // Hashed password
  }
];

// Export the users array to be used in authentication
module.exports = users; 