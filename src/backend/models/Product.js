const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, required: true },
  purchase_num: { type: Number, required: true },
  category: { type: String, required: true },
  image_url: { type: String },
  origin: { type: String }, // Thêm thuộc tính origin
  created_at: { type: Date, default: Date.now } // Thêm thuộc tính created_at
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
