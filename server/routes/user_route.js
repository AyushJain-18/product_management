const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../controllers/loginController');

// to Authenticate users
router.post('/login', authenticateUser);

// users to create product
router.post('/create_product');

module.exports = router;
