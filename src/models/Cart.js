const { Schema, model } = require('mongoose');

const CartSchema = new Schema(
	{
		user: { type: String, required: true },
		product: { type: String, required: true },
		price: { type: Number, required: true, unique: true },
	},
	{
		timestamps: true,
	}
);

module.exports = model('Cart', CartSchema);
