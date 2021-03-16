const mongoose = require('mongoose');

const MONGODB_URI = process.env.ROSES_STORE_MONGODB_URI;

// Conectando base de datos
mongoose.connect(MONGODB_URI, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
});
