const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error_msg', 'Not Authorized');
	res.redirect('/users/singin');
};

helpers.isRegistered = (req, res, next) => {
	// Verificando si hay un usuario registrado
	const user = req.user;
	if (user) {
		return next();
	}
	req.flash('error_msg', 'You are not registered');
	res.redirect('/users/singin');
};

module.exports = helpers;
