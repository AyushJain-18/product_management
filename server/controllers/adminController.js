const { ADMIN, NON_ADMIN } = require('../keys');
const { generateJWTToken } = require('../utils');
const Products = require('../model/products.model');
const Users = require('../model/users.model');

let getAllProducts = async (req, res) => {
  try {
    let allProducts = await Products.find({});
    return res.status(200).json({ products: allProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let createUser = async (req, res) => {
  let { userName, password, isAdminUser } = req.body;

  try {
    // check if user already present.
    let user = await Users.findOne({ username: userName });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user = new Users({
      username: userName,
      password: hashPassword,
      role: isAdminUser ? ADMIN : NON_ADMIN,
    });
    await user.save();

    // generate token.
    let token = generateJWTToken(user);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  createUser,
};
