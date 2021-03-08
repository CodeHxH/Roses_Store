const { Router } = require('express');
const router = Router();

const {} = require('../controllers/order.controllers');

// Render buy request
router.get('/request');

// Send buy request
router.post('/request/send-request');

module.exports = router;
