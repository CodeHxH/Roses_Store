const usersCtrl = {};

const passport = require('passport');

const User = require('../models/User');

usersCtrl.renderSingUpForm = (req, res) => {
	// Renderizando formulario de registro
	res.render('users/singup');
};

usersCtrl.singup = async (req, res) => {
	// Verificando datos del registro
	const errors = [];
	const { name, email, password, confirm_password } = req.body;
	if (password != confirm_password) {
		errors.push({ text: 'Las contraseñas no coinciden' });
	}
	if (password.length < 4) {
		errors.push({ text: 'La contraseña debe tener al menos 4 caracteres' });
	}
	if (errors.length > 0) {
		res.render('users/singup', {
			errors,
			name,
			email,
		});
	} else {
		const emailUser = await User.findOne({ email: email });
		if (emailUser) {
			req.flash('error_msg', 'El correo ya está en uso.');
			res.redirect('/users/singup');
		} else {
			const newUser = new User({ name, email, password });
			newUser.password = await newUser.encryptPassword(password);
			await newUser.save();
			req.flash('success_msg', 'Ya estás registrado');
			res.redirect('/users/singin');
		}
	}
};

usersCtrl.renderSingInForm = (req, res) => {
	// Renderizando inicio de sesión
	res.render('users/singin');
};

usersCtrl.singin = passport.authenticate('local', {
	failureRedirect: '/users/singin',
	successRedirect: '/',
	failureFlash: true,
});

usersCtrl.logout = (req, res) => {
	req.logout();
	req.flash('success_msg', 'Acabas de salir de la sesión');
	res.redirect('/');
};

module.exports = usersCtrl;
