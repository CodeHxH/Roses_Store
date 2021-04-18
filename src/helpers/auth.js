const helpers = {};

const Cart = require('../models/Cart');

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
	res.redirect('/cart');
};

helpers.formIsAuthenticated = (req, res, next) => {
	// Verificando que los datos del formulario fueron introducidos correctamente

	// Expresiones regulares
	const expressions = {
		name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		phone: /^\d{7,14}$/, // 7 a 14 numeros.
	};

	// Campos a confirmar
	const fields = {
		name: false,
		lastname: false,
		email: false,
		phone: false,
		message: false,
	};

	// Validando campos
	const validateField = (expression, fieldValue, field) => {
		if (expression.test(fieldValue)) {
			fields[field] = true;
		}
	};

	if (req.body.message) {
		fields['message'] = true;
	}

	validateField(expressions.name, req.body.name, 'name');
	validateField(expressions.name, req.body.lastname, 'lastname');
	validateField(expressions.email, req.body.email, 'email');
	validateField(expressions.phone, req.body.phone, 'phone');

	// Validando formulario
	if (
		fields.name &&
		fields.lastname &&
		fields.email &&
		fields.phone &&
		fields.message
	) {
		return next();
	} else {
		req.flash('error_msg', 'El mensaje no se ha podido enviar');
		res.redirect('/');
	}
};

helpers.orderIsAuthenticated = (req, res, next) => {
	// Verificando que los datos del formulario fueron introducidos correctamente

	// Expresiones regulares
	const expressions = {
		name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		phone: /^\d{7,14}$/, // 7 a 14 numeros.
	};

	// Campos a confirmar
	const fields = {
		clientName: false,
		clientLastname: false,
		clientEmail: false,
		clientPhone: false,
		clientCity: false,
		clientState: false,
		delivery: false,
		method: false,
	};

	// Validando campos
	const validateField = (expression, fieldValue, field) => {
		if (expression.test(fieldValue)) {
			fields[field] = true;
		}
	};

	if (req.body.delivery) {
		fields['delivery'] = true;
	}
	if (req.body.method) {
		fields['method'] = true;
	}

	validateField(expressions.name, req.body.clientName, 'clientName');
	validateField(expressions.name, req.body.clientLastname, 'clientLastname');
	validateField(expressions.email, req.body.clientEmail, 'clientEmail');
	validateField(expressions.phone, req.body.clientPhone, 'clientPhone');
	validateField(expressions.name, req.body.clientCity, 'clientCity');
	validateField(expressions.name, req.body.clientState, 'clientState');

	// Validando formulario
	if (
		fields.clientName &&
		fields.clientLastname &&
		fields.clientEmail &&
		fields.clientPhone &&
		fields.clientCity &&
		fields.clientState &&
		fields.delivery &&
		fields.method
	) {
		return next();
	} else {
		req.flash('error_msg', 'Verifica que los datos sean correctos');
		res.redirect('/order');
	}
};

module.exports = helpers;
