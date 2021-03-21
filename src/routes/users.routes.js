const { Router } = require('express');
const router = Router();

const {
	renderSingUpForm,
	singup,
	renderSingInForm,
	singin,
	logout,
} = require('../controllers/users.controllers');

// Render singup
router.get('/users/singup', renderSingUpForm);

// Singup request
router.post('/users/singup', singup);

// Render singin
router.get('/users/singin', renderSingInForm);

// Singin request
router.post('/users/singin', singin);

// Logout
router.get('/users/logout', logout);

module.exports = router;
