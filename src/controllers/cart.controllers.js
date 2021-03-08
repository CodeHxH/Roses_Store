const cartCtrl = {};

const cart = require('../models/Cart');

cartCtrl.addNewProduct = async (req, res) => {
	res.send('Hello World');
};

cartCtrl.renderShoppingCart = async (req, res) => {
	res.send('Hello World');
};

cartCtrl.deleteProduct = async (req, res) => {
	res.send('Hello World');
};

module.exports = cartCtrl;
