const Products = require('../model/products.model');
const mongoose = require('mongoose');

let deleteProduct = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res.send(400).json({ message: 'Product information is missing' });
  }
  await Products.findByIdAndDelete(productId);
  return res.send().json({ message: 'Product deleted' });
};

let modifyProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, description, category, add_users, remove_users } =
      req.body;

    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product details
    if (name) product.name = name;
    if (price) product.price = price;
    if (category) product.category = category;
    if (description) product.description = description;

    // Add users to the assigned_users array
    if (add_users) {
      add_users.forEach((userId) => {
        // condition to check if user is already added to that product
        let isUserIdInProduct = product.assigned_users.some(
          (user) => user.user_id.toString() === userId
        );
        if (!isUserIdInProduct) {
          product.assigned_users.push({
            user_id: new mongoose.Types.ObjectId(userId),
          });
        }
      });
    }

    // Remove users from the assigned_users array
    if (remove_users) {
      product.assigned_users = product.assigned_users.filter(
        (user) => !remove_users.includes(user.user_id.toString())
      );
    }
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteProduct,
  modifyProduct,
};
