const helpers = {};

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
	res.redirect('/users/singin');
};

module.exports = helpers;
