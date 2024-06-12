const User = require('../model/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../keys');

let authenticateUser = async (req, res) => {
  let { userName, password } = req.body;
  try {
    let user = await User.findOne({ username: userName });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    let isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    let token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, {
      expiresIn: '1hr',
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ message: error.message });
  }
};

let registerUser = async (req, res) => {
  let { userName, password, isAdminUser } = req.body;

  try {
    // check if user already present.
    let user = await User.findOne({ username: userName });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user = new User({
      username: userName,
      password: hashPassword,
      role: isAdminUser ? 'ADMIN' : 'USER',
    });
    await user.save();

    // generate token.

    let token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, {
      expiresIn: '1hr',
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  authenticateUser,
  registerUser,
};
