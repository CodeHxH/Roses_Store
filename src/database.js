const mongoose = require('mongoose');

const MONGODB_URI = process.env.ROSES_STORE_MONGODB_URI;

mongoose.connect(MONGODB_URI, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
});

mongoose.connection.on('open', (_) => {
	console.log('Database is connected to', MONGODB_URI);
});
