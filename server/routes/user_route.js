const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  viewProductForUser,
  createNewProductForUser,
} = require('../controllers/userController');
const { checkUserAuthMiddelware } = require('../middelware');

// to Authenticate users
router.post('/login', authenticateUser);

// view users product.
router.get('/view_product', checkUserAuthMiddelware, viewProductForUser);

// users to create product
router.post(
  '/create_product',
  checkUserAuthMiddelware,
  createNewProductForUser
);

module.exports = router;
