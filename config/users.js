const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('password', 10)
  },
  {
    id: 2,
    username: 'user',
    password: bcrypt.hashSync('123456', 10)
  }
];

module.exports = users; 