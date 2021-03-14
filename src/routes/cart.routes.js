const { Router } = require('express');
const router = Router();

const {
	addNewProduct,
	renderShoppingCart,
	deleteProduct,
	createNewCart,
} = require('../controllers/cart.controllers');

const { isAuthenticated } = require('../helpers/auth');

// Add Product
router.post('/cart/add-product', addNewProduct);

// Get all Products
router.get('/cart', renderShoppingCart);

// Delete Product
router.delete('/cart/delete-product', deleteProduct);

module.exports = router;
