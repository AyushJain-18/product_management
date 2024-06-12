const User = require('../model/users.model');
const { generateJWTToken, verifyJWTToken } = require('../utils');
const bcrypt = require('bcrypt');

let authenticateUser = async (req, res) => {
  let { userName, password } = req.body;
  try {
    let user = await User.findOne({ username: userName });
    console.log('ayush', password, user.password);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    let isPasswordMatch = await verifyJWTToken(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    let token = generateJWTToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  authenticateUser,
};
