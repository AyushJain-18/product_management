const express = require('express');
const router = express.Router();
// api/product

// modify product and users assosiate to product
//1. Admnin can edit, and delete products.(Same SKU should not be created multiple times)
//2.Admin can assign product to multiple users and while editing product admin can add and remove users.
router.put('/');

// delete product
router.delete('/:productId');

module.exports = router;
