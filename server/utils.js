const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./keys');

let generateJWTToken = (user) => {
  let token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, {
    expiresIn: '1hr',
  });
  return token;
};

let verifyJWTToken = async (password, hashPassword) => {
  let isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
};

module.exports = {
  generateJWTToken,
  verifyJWTToken,
};
