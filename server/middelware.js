const { SECRET_KEY } = require('./keys');
const jwt = require('jsonwebtoken');
let checkAuthMiddelware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied' });
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('decode', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Error occured in auth middelware', error);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = {
  checkAuthMiddelware,
};
