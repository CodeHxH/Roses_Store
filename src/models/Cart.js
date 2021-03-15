const { Schema, model } = require('mongoose');

const CartSchema = new Schema(
	{
		user: { type: String, required: true },
		product: { type: {}, required: true },
	},
	{
		timestamps: true,
	}
);

module.exports = model('Cart', CartSchema);
