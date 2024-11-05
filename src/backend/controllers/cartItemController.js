const CartItem = require('../models/CartItem');

const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.find().populate('productId');
        console.log("Cart items found: ", cartItems);
        res.json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items: ", error);
        res.status(500).json({ error: error.message });
    }
};

// Tạo một cart item mới
const createCartItem = async (req, res) => {
    try {
        const cartItem = new CartItem(req.body);
        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCartItemById = async (req, res) => {
    console.log('Fetching cart item with ID:', req.params.id); // Thêm dòng này
    try {
        const cartItem = await CartItem.findById(req.params.id).populate('productId');
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.json(cartItem);
    } catch (error) {
        console.error("Error fetching cart item: ", error);
        res.status(500).json({ error: error.message });
    }
};


// Cập nhật cart item
const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCartItem = await CartItem.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCartItem) return res.status(404).json({ message: 'Cart item not found' });
        res.json(updatedCartItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa cart item
const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCartItem = await CartItem.findByIdAndDelete(id);
        if (!deletedCartItem) return res.status(404).json({ message: 'Cart item not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCartItems,
    createCartItem,
    getCartItemById,
    updateCartItem,
    deleteCartItem
};
