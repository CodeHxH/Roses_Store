const { Router } = require('express');
const router = Router();

const {
	addNewProduct,
	renderShoppingCart,
	deleteProduct,
} = require('../controllers/cart.controllers');

const { isAuthenticated } = require('../helpers/auth');

// Add Product
router.post('/cart/add-product', isAuthenticated, addNewProduct);

// Get all Products
router.get('/cart', isAuthenticated, renderShoppingCart);

// Delete Product
router.delete('/cart/delete-product', isAuthenticated, deleteProduct);

module.exports = router;
