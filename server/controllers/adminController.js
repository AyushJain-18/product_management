const { ADMIN, NON_ADMIN } = require('../keys');
const { generateJWTToken, getImageLocation, generateSKU } = require('../utils');
const Products = require('../model/products.model');
const Users = require('../model/users.model');

const bcrypt = require('bcrypt');

let getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.aggregate([
      {
        $lookup: {
          from: 'users', // The collection to join
          localField: 'assigned_users.user_id', // The field from the input documents
          foreignField: '_id', // The field from the documents of the "from" collection
          as: 'assigned_users', // The name of the new array field to add to the input documents
        },
      },
      {
        $project: {
          name: 1,
          SKU: 1,
          price: 1,
          description: 1,
          category: 1,
          image: 1,
          assigned_users: { username: 1, _id: 1 },
        },
      },
    ]);
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

let getAllNonAdminUsers = async (req, res) => {
  try {
    let users = await Users.find({ role: NON_ADMIN }, { username: 1, _id: 1 });
    return res.status(200).json({ users: users });
  } catch (error) {
    console.log('Error occured', error);
    return res.status(500).json({ message: error.message });
  }
};
let getAllUsers = async (req, res) => {
  try {
    let users = await Users.find({}, { username: 1, _id: 1 });
    return res.status(200).json({ users: users });
  } catch (error) {
    console.log('Error occured', error);
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllProducts,
  createUser,
  createProduct,
  getAllNonAdminUsers,
  getAllUsers,
};
