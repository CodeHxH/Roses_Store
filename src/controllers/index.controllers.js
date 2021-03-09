const indexCtrl = {};

const Products = require('../models/Product');

indexCtrl.renderIndex = async (req, res) => {
	const products = await Products.find().sort({
		createdAt: 'desc',
	});
	res.render('index', { products });
};

indexCtrl.renderAbout = (req, res) => {
	res.render('about');
};

module.exports = indexCtrl;
