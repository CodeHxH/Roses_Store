const { Router } = require('express');
const router = Router();

const {
	renderSingUpForm,
	singup,
	renderSingInForm,
	singin,
	logout,
} = require('../controllers/users.controllers');

router.get('/users/singup', renderSingUpForm);

router.post('/users/singup', singup);

router.get('/users/singin', renderSingInForm);

router.post('/users/singin', singin);

router.get('/users/logout', logout);

module.exports = router;
