const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  createUser,
  createProduct,
  getAllNonAdminUsers,
  getAllUsers,
} = require('../controllers/adminController');

// /api/admin

// all admin + non admin users
router.get('/all_users_admin_non_admin', getAllUsers);

// get all users
router.get('/all_users', getAllNonAdminUsers);
//New user creation will be done from the Admin Account.(No requiremen to edit or delete users.)
router.post('/create_user', createUser);

// to display all products to admin
router.get('/product', getAllProducts);

// When creating a product, the admin can select the multiple user to whom the product will be assigned.
router.post('/product', createProduct);

module.exports = router;
