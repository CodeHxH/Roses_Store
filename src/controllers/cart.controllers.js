const cartCtrl = {};

const Cart = require('../models/Cart');
const Products = require('../models/Product');

cartCtrl.addNewProduct = async (req, res) => {
	// Verificando si el usuario ya tiene un carrito de compras
	const UserCart = await Cart.find({ user: req.user.id });
	if (UserCart == false) {
		// Creando un nuevo carrito de compras
		const NewCart = new Cart({
			user: req.user.id,
			products: [],
		});
		await NewCart.save();
	}
	console.log(UserCart);
	res.redirect('/cart');
};

cartCtrl.renderShoppingCart = async (req, res) => {
	res.render('cart');
};

cartCtrl.deleteProduct = async (req, res) => {
	res.send('Hello World');
};

module.exports = cartCtrl;
