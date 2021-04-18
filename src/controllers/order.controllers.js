const orderCtrl = {};

const nodemailer = require('nodemailer');

const Order = require('../models/Order');
const Cart = require('../models/Cart');

orderCtrl.renderOrderForm = async (req, res) => {
	// Renderizando formulario de petición de compra
	res.render('order');
};

orderCtrl.addNewOrder = async (req, res) => {
	// Nuevo pedido
	const newOrder = new Order({
		order: {},
		user: req.user.id,
	});
	// Guardando datos de la compra
	newOrder.order.name = req.body.clientName;
	newOrder.order.lastname = req.body.clientLastname;
	newOrder.order.email = req.body.clientEmail;
	newOrder.order.phone = req.body.clientPhone;
	newOrder.order.city = req.body.clientCity;
	newOrder.order.state = req.body.clientState;
	newOrder.order.method = req.body.method;
	newOrder.order.delivery = req.body.delivery;
	newOrder.order.products = await Cart.find({ user: req.user.id });

	await newOrder.save();

	// Listando productos del pedido
	let orderForSend = ``;
	newOrder.order.products.forEach((element) => {
		let productName = element.product.name;
		orderForSend += `<li><b>COD</b>. ${productName}</li>`;
	});

	// Calculando subtotal
	const UserCart = await Cart.find({ user: req.user.id });
	let subtotal = 0;
	UserCart.forEach((element) => {
		subtotal += element.product.price;
	});

	// Destructuring del cuerpo de la petición
	const {
		clientName,
		clientLastname,
		clientEmail,
		clientPhone,
		method,
		delivery,
		clientCity,
		clientState,
	} = req.body;

	// Contenido del pedido
	contentHTML = `<h1>Orden de compra</h1>
	<h3>Datos del usuario</h3>
	<ul>
		<li><b>Nombre</b>: ${clientName}</li>
		<li><b>Apellido</b>: ${clientLastname}</li>
		<li><b>Teléfono</b>: ${clientPhone}</li>
		<li><b>Correo</b>: ${clientEmail}</li>
		<li><b>Ciudad</b>: ${clientCity}</li>
		<li><b>Estado</b>: ${clientState}</li>
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
