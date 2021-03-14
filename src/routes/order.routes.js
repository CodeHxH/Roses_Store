const { Router } = require('express');
const router = Router();

const {} = require('../controllers/order.controllers');

// Render purchase request
router.get('/request');

// Send purchase request
router.post('/request/send-request');

module.exports = router;
