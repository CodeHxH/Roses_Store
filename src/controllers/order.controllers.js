const orderCtrl = {};

const nodemailer = require('nodemailer');

const Order = require('../models/Order');
const Cart = require('../models/Cart');

orderCtrl.renderOrderForm = async (req, res, next) => {
	res.render('order');
};

orderCtrl.addNewOrder = async (req, res) => {
	const newOrder = new Order({
		order: {},
		user: req.user.id,
	});
	// Guardando datos de la compra
	newOrder.name = req.body.name;
	newOrder.lastname = req.body.lastname;
	newOrder.phone = req.body.phone;
	newOrder.email = req.body.email;
	newOrder.method = req.body.method;
	newOrder.delivery = req.body.delivery;
	newOrder.city = req.body.city;
	newOrder.state = req.body.state;
	newOrder.products = await Cart.find({ user: req.user.id });

	await newOrder.save();

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

	contentHTML = `<h1>Orden de compra</h1>
	<h3>Datos del usuario</h3>
	<ul>
		<li>Nombre: ${name}</li>
		<li>Apellido: ${lastname}</li>
		<li>Teléfono: ${phone}</li>
		<li>Correo: ${email}</li>
		<li>Ciudad: ${city}</li>
		<li>Estado: ${state}</li>
	</ul>
	<h3>Datos de la compra</h3>
	<ul>
		<li>Método de pago: ${method}</li>
		<li>Delivery: ${delivery}</li>
	</ul>
	<h3>Productos solicitados por el usuario</h3>
	<ul>
		<li></li>
	</ul>`;

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

	await transporter.sendMail({
		from: '"Cliente" <onthewitsite@gmail.com>',
		to: 'louisesrosespedidos@gmail.com',
		subject: 'Pedido',
		html: contentHTML,
	});

	res.render('request_message');
};

module.exports = orderCtrl;
