const { Router } = require('express');
const router = Router();

const {
	renderIndex,
	renderAbout,
} = require('../controllers/index.controllers');

// Render index
router.get('/', renderIndex);

// Render about
router.get('/about', renderAbout);

router.get('/products');

router.get('/message');

module.exports = router;
