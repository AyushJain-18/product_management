const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { images } = require('./keys');
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

let getImageLocation = () => {
  let imageName = `${images[Math.floor(Math.random() * 6)]}.jpg`;
  return imageName;
};

let generateSKU = (
  name = 'name',
  description = 'description',
  category = ''
) => {
  name = name.toUpperCase().trim();
  description = name.toUpperCase().trim().slice(0, 10);
  category = category.toUpperCase().trim();
  let date = new Date().getTime();
  return `${date}_${name}_${category}_${description}`;
};
module.exports = {
  generateJWTToken,
  verifyJWTToken,
  getImageLocation,
  generateSKU,
};
