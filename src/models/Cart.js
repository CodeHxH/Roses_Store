const { Schema, model } = require('mongoose');

const CartSchema = new Schema(
	{
		user: { type: String, required: true, unique: true },
		products: { type: Array },
	},
	{
		timestamps: true,
	}
);

module.exports = model('Cart', CartSchema);
