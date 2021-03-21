const { Router } = require('express');
const router = Router();

const {
	addNewOrder,
	sendOrder,
	renderOrderForm,
} = require('../controllers/order.controllers');

const { isRegistered } = require('../helpers/auth');

// Render purchase request
router.get('/order', isRegistered, renderOrderForm);

// Send purchase request
router.post('/send/order', isRegistered, addNewOrder);

module.exports = router;
