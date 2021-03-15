const { Router } = require('express');
const router = Router();

const {
	addNewProduct,
	renderShoppingCart,
	deleteProduct,
} = require('../controllers/cart.controllers');

const { isRegistered } = require('../helpers/auth');

// Add Product
router.post('/cart/add', isRegistered, addNewProduct);

// Get all Products
router.get('/cart', isRegistered, renderShoppingCart);

// Delete Product
router.delete('/cart/delete/:id', deleteProduct);

module.exports = router;
