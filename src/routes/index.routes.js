const { Router } = require('express');
const router = Router();

const {
	renderIndex,
	renderAbout,
	sendMessage,
} = require('../controllers/index.controllers');

// Render index
router.get('/', renderIndex);

// Render about
router.get('/about', renderAbout);

// Send a message
router.post('/send/message', sendMessage);

router.get('/products');

module.exports = router;
