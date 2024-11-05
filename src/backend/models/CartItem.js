const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  quantity: { type: Number, required: true, min: 1 },
});

const CartItem = mongoose.model('CartItem', cartItemSchema, 'cartitems');

module.exports = CartItem;
