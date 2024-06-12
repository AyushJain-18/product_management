const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  viewProductForUser,
  createNewProductForUser,
} = require('../controllers/userController');
const { checkUserAuthMiddelware } = require('../middelware');

// view users product.
router.get('/view_product', checkUserAuthMiddelware, viewProductForUser);

// to Authenticate users
router.post('/login', authenticateUser);

//Regular user can create products for their own account which will be visible to admin.
router.post(
  '/create_product',
  checkUserAuthMiddelware,
  createNewProductForUser
);

module.exports = router;
