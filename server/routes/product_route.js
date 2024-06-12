const express = require('express');
const router = express.Router();
// api/product

// to display related product to users
router.get('/');

// to create new product
//1.When creating a product, the admin can select the multiple user to whom the product will be assigned.
//2.Regular user can create products for their own account which will be visible to admin.

router.post('/');

// modify product and users assosiate to product
//1.Admins can create, edit, and delete products.(Same SKU should not be created multiple times)
//2.Admin can assign product to multiple users and while editing product admin can add and remove users.
router.put('/');

// delete product
router.delete('/:productId');

module.exports = router;
