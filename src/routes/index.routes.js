const { Router } = require('express');
const router = Router();

const {
	renderIndex,
	renderAbout,
} = require('../controllers/index.controllers');

router.get('/', renderIndex);

router.get('/about', renderAbout);

router.get('/products');

router.get('/message');

module.exports = router;
