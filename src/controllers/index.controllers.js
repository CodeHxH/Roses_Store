const indexCtrl = {};

const Products = require('../models/Product');
const nodemailer = require('nodemailer');

indexCtrl.renderIndex = async (req, res) => {
	// Pasando 9 productos a la página de inicio
	const list = await Products.find().sort({
		createdAt: 'desc',
	});

	let products = [];
	for (let i = 0; i <= 8; i++) {
		products[i] = list[i];
	}

	res.render('index', { products });
};

indexCtrl.renderProducts = async (req, res) => {
	// Obteniendo los productos y renderizando la página de productos
	const products = await Products.find();

	res.render('products', { products });
};

indexCtrl.sendMessage = async (req, res) => {
	// Enviando mensajes del usuario
	const { name, lastname, phone, email, message } = req.body;

	contentHTML = `
	<h2>Información del usuario</h2>
	<br>
	<ul>
		<li><b>Nombre:</b> ${name}</li>
		<li><b>Apellido:</b> ${lastname}</li>
		<li><b>Email:</b> ${email}</li>
		<li><b>Teléfono:</b> ${phone}</li>
	</ul>
	<br>
	<h3>Mensaje del usuario.</h3>
	<p>${message}</p>`;

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
		subject: 'Mensaje de usuario',
		html: contentHTML,
	});

	req.flash('success_msg', 'Mensage enviado con éxito');

	res.redirect('/');
};

module.exports = indexCtrl;
