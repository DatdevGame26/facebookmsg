const Product = require('../models/Product');

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log("Products found: ", products);
        res.json(products);
    } catch (error) {
        console.error("Error fetching products: ", error);
        res.status(500).json({ error: error.message });
    }
}


// Tìm kiếm sản phẩm theo tên
const searchProductsByName = async (req, res) => {
    const keyword = req.query.keyword;
    if (!keyword) {
        return res.status(400).json({ message: 'Keyword is required' });
    }
    try {
        const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({ category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTopPurchasedProducts = async (req, res) => {
    try {
      // Truy vấn lấy 4 sản phẩm có số lượng mua nhiều nhất, sắp xếp theo purchase_num giảm dần
      const products = await Product.find().sort({ purchase_num: -1 }).limit(10);
      
      // Trả về sản phẩm
      res.json(products);
    } catch (error) {
      console.error("Error fetching top purchased products:", error);
      res.status(500).json({ error: error.message });
    }
  };


module.exports = {
    getAllProducts,
    getProductById,
    searchProductsByName,
    getProductsByCategory,
    getTopPurchasedProducts
};
