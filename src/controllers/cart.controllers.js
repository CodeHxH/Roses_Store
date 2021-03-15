const cartCtrl = {};

const Cart = require('../models/Cart');
const Products = require('../models/Product');

cartCtrl.addNewProduct = async (req, res) => {
	// Buscar el producto
	const product = await Products.findById(req.body.ProductId);
	// Creando un nuevo producto para el carrito
	const NewProductCart = new Cart({
		user: req.user.id,
		product: product,
	});
	await NewProductCart.save();
	res.redirect('/');
};

cartCtrl.renderShoppingCart = async (req, res) => {
	let UserCart = await Cart.find({ user: req.user.id });
	res.render('cart', { UserCart });
};

cartCtrl.deleteProduct = async (req, res) => {
	// Eliminando producto del carrito
	await Cart.findByIdAndDelete(req.params.id);
	res.redirect('/cart');
};

module.exports = cartCtrl;
