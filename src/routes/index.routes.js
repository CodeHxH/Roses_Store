const { Router } = require('express');
const router = Router();

const {
	renderIndex,
	sendMessage,
	renderProducts,
} = require('../controllers/index.controllers');

const { formIsAuthenticated } = require('../helpers/auth');

// Render index
router.get('/', renderIndex);

// Send a message
router.post('/send/message', formIsAuthenticated, sendMessage);

// Render all products
router.get('/products', renderProducts);

module.exports = router;
