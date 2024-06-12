const express = require('express');
const router = express.Router();
const { checkAuthMiddelware } = require('../middelware');
const { getAllProducts } = require('../controllers/adminController');

// to display all products to admin
router.get('/product', checkAuthMiddelware, getAllProducts);

// user creation
//1. New user creation will be done from the Admin Account.(No requiremen to edit or delete users.)
router.post('/create_user');

module.exports = router;
