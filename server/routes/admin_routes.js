const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  createUser,
  createProduct,
  getAllUsers,
} = require('../controllers/adminController');

// /api/admin

// get all users
router.get('/all_users', getAllUsers);
//New user creation will be done from the Admin Account.(No requiremen to edit or delete users.)
router.post('/create_user', createUser);

// to display all products to admin
router.get('/product', getAllProducts);

// When creating a product, the admin can select the multiple user to whom the product will be assigned.
router.post('/product', createProduct);

module.exports = router;
