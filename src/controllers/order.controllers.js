const orderCtrl = {};

const nodemailer = require('nodemailer');

const Order = require('../models/Order');
const Cart = require('../models/Cart');

orderCtrl.renderOrderForm = async (req, res) => {
	res.render('order');
};

orderCtrl.addNewOrder = async (req, res) => {
	// Nuevo pedido
	const newOrder = new Order({
		order: {},
		user: req.user.id,
	});
	// Guardando datos de la compra
	newOrder.order.name = req.body.name;
	newOrder.order.lastname = req.body.lastname;
	newOrder.order.phone = req.body.phone;
	newOrder.order.email = req.body.email;
	newOrder.order.method = req.body.method;
	newOrder.order.delivery = req.body.delivery;
	newOrder.order.city = req.body.city;
	newOrder.order.state = req.body.state;
	newOrder.order.products = await Cart.find({ user: req.user.id });

	await newOrder.save();

	// Listando productos del pedido
	let orderForSend = ``;
	newOrder.order.products.forEach((element) => {
		let productName = element.product.name;
		orderForSend += `<li>${productName}</li>`;
	});

	// Calculando subtotal
	const UserCart = await Cart.find({ user: req.user.id });
	let subtotal = 0;
	UserCart.forEach((element) => {
		subtotal += element.product.price;
	});

	const {
		name,
		lastname,
		phone,
		email,
		method,
		delivery,
		city,
		state,
	} = req.body;

	// Contenido del pedido
	contentHTML = `<h1>Orden de compra</h1>
	<h3>Datos del usuario</h3>
	<ul>
		<li><b>Nombre</b>: ${name}</li>
		<li><b>Apellido</b>: ${lastname}</li>
		<li><b>Teléfono</b>: ${phone}</li>
		<li><b>Correo</b>: ${email}</li>
		<li><b>Ciudad</b>: ${city}</li>
		<li><b>Estado</b>: ${state}</li>
	</ul>
	<h3>Datos de la compra</h3>
	<ul>
		<li><b>Método de pago</b>: ${method}</li>
		<li><b>Delivery</b>: ${delivery}</li>
	</ul>
	<h3>Productos solicitados por el usuario</h3>
	<ul>
	${orderForSend}
	</ul>
	<h2>Costo de los productos: ${subtotal}$</h2>`;

	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: 'louisesrosespedidos@gmail.com',
			pass: process.env.GMAIL_PASSWORD,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	// Enviando pedido
	await transporter.sendMail({
		from: '"Cliente" <onthewitsite@gmail.com>',
		to: 'louisesrosespedidos@gmail.com',
		subject: 'Pedido',
		html: contentHTML,
	});

	// Eliminando el carrito
	await Cart.deleteMany({ user: req.user.id });

	res.render('request_message');
};

module.exports = orderCtrl;
