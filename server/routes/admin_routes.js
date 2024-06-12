const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  createUser,
} = require('../controllers/adminController');

// /api/admin
// to display all products to admin
router.get('/product', getAllProducts);

// user creation
//1. New user creation will be done from the Admin Account.(No requiremen to edit or delete users.)
router.post('/create_user', createUser);

module.exports = router;
