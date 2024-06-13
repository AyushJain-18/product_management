const { ADMIN, NON_ADMIN } = require('../keys');
const { generateJWTToken } = require('../utils');
const Products = require('../model/products.model');
const Users = require('../model/users.model');

const bcrypt = require('bcrypt');

let getAllProducts = async (req, res) => {
  try {
    let allProducts = await Products.find({});
    return res.status(200).json({ products: allProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let createProduct = async (req, res) => {
  try {
    // users will be an array of users id for which products needs to be added.
    let { name, price, description, category, users } = req.body;
    if (!name || !price || !description || !category || !users) {
      return res.status(400).json({
        message: 'Missing field:- name, price, description, category, users',
      });
    }
    let image = getImageLocation();
    let SKU = generateSKU(name, description, category);
    let assigned_users =
      users.length === 0
        ? []
        : users.map((user) => ({
            user_id: user,
          }));
    let product = new Products({
      name,
      SKU,
      price,
      description,
      category,
      image,
      created_by: req.user.userId,
      assigned_users: assigned_users,
    });
    await product.save();
    return res.status(201).json({ message: 'Product is created' });
  } catch (error) {
    console.log('Error while creating new product', error);
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

let getAllUsers = async (req, res) => {
  try {
    let users = Users.find({ role: NON_ADMIN });
    return res.send(200).json(users);
  } catch (error) {
    console.log('Error occured', error);
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllProducts,
  createUser,
  createProduct,
  getAllUsers,
};
