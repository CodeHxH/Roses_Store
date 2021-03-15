const cartCtrl = {};

const Cart = require('../models/Cart');
const Products = require('../models/Product');

cartCtrl.addNewProduct = async (req, res) => {
	// Verificando si hay un usuario registrado
	const user = req.user;
	if (!user) {
		res.redirect('/users/singup');
	} else {
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
		// Buscar el producto
		const product = await Products.findById(req.body.ProductId);
		// Ingresando nuevo producto al array del carrito
		newProduct.push(product);
		// Actualizando carrito
		await Cart.updateOne({ _id: cartId }, { products: newProduct });
		res.redirect('/');
	}
};

cartCtrl.renderShoppingCart = async (req, res) => {
	// Verificando si hay un usuario registrado
	const user = req.user;
	if (!user) {
		res.redirect('/users/singup');
	} else {
		let UserCart = await Cart.find({ user: req.user.id });
		UserCart = UserCart[0].products;
		res.render('cart', { UserCart });
	}
};

cartCtrl.deleteProduct = async (req, res) => {
	res.redirect('cart');
};

module.exports = cartCtrl;
