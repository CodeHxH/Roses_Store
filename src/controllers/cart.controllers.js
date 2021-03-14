const cartCtrl = {};

const Cart = require('../models/Cart');
const Products = require('../models/Product');

cartCtrl.addNewProduct = async (req, res) => {
	// Verificando si el usuario ya tiene un carrito de compras
	let UserCart = await Cart.find({ user: req.user.id });
	if (UserCart == false) {
		// Creando un nuevo carrito de compras
		const NewCart = new Cart({
			user: req.user.id,
			products: [],
		});
		await NewCart.save();
	}
	UserCart = await Cart.find({ user: req.user.id });
	// Obteniendo los valores del carrito
	UserCart = UserCart[0];
	const newProduct = UserCart.products;
	const cartId = UserCart._id;
	// Ingresando nuevo producto al array del carrito
	newProduct.push(req.body.ProductId);
	UserCart.products = newProduct;
	// Actualizando carrito
	await Cart.updateOne({ _id: cartId }, { products: newProduct });
	res.redirect('/cart');
};

cartCtrl.renderShoppingCart = async (req, res) => {
	res.render('cart');
};

cartCtrl.deleteProduct = async (req, res) => {
	res.send('Hello World');
};

module.exports = cartCtrl;
