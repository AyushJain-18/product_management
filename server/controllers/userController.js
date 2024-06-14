const Users = require('../model/users.model');
const Products = require('../model/products.model');

const { generateJWTToken, verifyJWTToken } = require('../utils');
const { getImageLocation, generateSKU } = require('../utils');

let authenticateUser = async (req, res) => {
  let { userName, password } = req.body;
  try {
    let user = await Users.findOne({ username: userName });
    console.log('ayush', password, user?.password);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    let isPasswordMatch = await verifyJWTToken(password, user?.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    let token = generateJWTToken(user);
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ message: error.message });
  }
};

let createNewProductForUser = async (req, res) => {
  try {
    let { name, price, description, category } = req.body;
    if (!name || !price || !description || !category) {
      return res.status(400).json({
        message: 'Missing field:- name, price, description, category',
      });
    }
    let image = getImageLocation();
    let SKU = generateSKU(name, description, category);
    let product = new Products({
      name,
      SKU,
      price,
      description,
      category,
      image,
      created_by: req.user.userId,
      assigned_users: [{ user_id: req.user.userId }],
    });
    await product.save();
    res.status(201).json({ message: 'Product is created' });
  } catch (error) {
    console.log('Error while creating new product', error);
    res.status(500).json({ message: error.message });
  }
};

let viewProductForUser = async (req, res) => {
  try {
    let products = await Products.find(
      {
        'assigned_users.user_id': req.user.userId,
      },
      { assigned_users: 0 }
    );
    res.status(200).json(products);
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  authenticateUser,
  createNewProductForUser,
  viewProductForUser,
};
