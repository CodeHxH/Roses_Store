const { Router } = require('express');
const router = Router();

const {
	renderIndex,
	renderAbout,
	sendMessage,
	renderProducts,
} = require('../controllers/index.controllers');

// Render index
router.get('/', renderIndex);

// Render about
router.get('/about', renderAbout);

// Send a message
router.post('/send/message', sendMessage);

// Render all products
router.get('/products', renderProducts);

module.exports = router;
