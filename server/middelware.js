const { SECRET_KEY, ADMIN } = require('./keys');
const jwt = require('jsonwebtoken');
const User = require('./model/users.model');

let checkUserAuthMiddelware = (req, res, next) => {
  let userValue = getUserValueFromToken(req, res);
  req.user = userValue;
  next();
};

let checkAdminAuthMiddelware = async (req, res, next) => {
  let userValue = getUserValueFromToken(req, res);
  if (userValue.role !== ADMIN) {
    return res.status(401).json({ message: 'Access denied' });
  }
  let adminUser = await User.findById(userValue.userId);
  if (!adminUser) {
    return res.status(401).json({ message: 'Access denied' });
  }
  req.user = userValue;
  next();
};

const getUserValueFromToken = (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }
    const userValue = jwt.verify(token, SECRET_KEY);
    return userValue;
  } catch (error) {
    console.log('Error occured in auth middelware', error);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = {
  checkUserAuthMiddelware,
  checkAdminAuthMiddelware,
};
