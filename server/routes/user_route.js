const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// to Authenticate users
router.post('/login', loginController.authenticateUser);

router.post('/register', loginController.registerUser);

// users to create product
router.post('/create_product');

module.exports = router;
