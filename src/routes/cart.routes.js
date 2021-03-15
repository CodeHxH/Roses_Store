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
router.post('/cart/add', addNewProduct);

// Get all Products
router.get('/cart', renderShoppingCart);

// Delete Product
router.delete('/cart/delete/:id', deleteProduct);

module.exports = router;
