const { Router } = require('express');
const router = Router();

const {
	addNewOrder,
	renderOrderForm,
} = require('../controllers/order.controllers');

const { isRegistered, thereIsProducts } = require('../helpers/auth');

// Render purchase request
router.get('/order', isRegistered, thereIsProducts, renderOrderForm);

// Send purchase request
router.post('/send/order', isRegistered, addNewOrder);

module.exports = router;
