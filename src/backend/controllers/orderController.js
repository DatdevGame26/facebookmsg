const Order = require('../models/Order');

// Tạo một đơn hàng mới
const createOrder = async (req, res) => {
  try {
    const { userId, cartItems, total_price, payment_method } = req.body;

    const newOrder = new Order({
      userId,
      items: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      total_price,
      payment_method,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Đơn hàng đã được tạo thành công', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tạo đơn hàng', error });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate('items.productId', 'name price'); 

    if (!orders.length) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng cho người dùng này' });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy đơn hàng', error });
  }
};
  
  module.exports = {
    createOrder,
    getOrdersByUserId, 
  };
