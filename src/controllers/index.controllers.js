const indexCtrl = {};

indexCtrl.renderIndex = async (req, res) => {
	res.render('/');
};

indexCtrl.renderAbout = (req, res) => {
	res.render('about');
};

module.exports = indexCtrl;
