const helpers = {};

const Cart = require('../models/Cart');

helpers.isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error_msg', 'No estás autorizado');
	res.redirect('/users/singin');
};

helpers.isRegistered = (req, res, next) => {
	// Verificando si hay un usuario registrado
	const user = req.user;
	if (user) {
		return next();
	}
	req.flash('error_msg', 'Aún no estás registrado');
	res.redirect('/users/singup');
};

helpers.thereIsProducts = async (req, res, next) => {
	// Verificando si hay productos en el carrito
	const UserCart = await Cart.find({ user: req.user.id });
	if (UserCart[0]) {
		return next();
	}
	req.flash('error_msg', 'Aún no hay productos en tu carrito');
	res.redirect('/');
};

module.exports = helpers;
