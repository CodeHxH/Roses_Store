const { Schema, model } = require('mongoose');

const CartSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true, unique: true },
	},
	{
		timestamps: true,
	}
);

module.exports = model('Cart', CartSchema);
