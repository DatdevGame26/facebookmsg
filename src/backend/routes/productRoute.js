const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

// Các route hiện có
router.get('/', productController.getAllProducts); // Lấy tất cả sản phẩm
router.get('/search', productController.searchProductsByName); // Tìm kiếm sản phẩm theo tên
router.get('/category/:category', productController.getProductsByCategory); // Lấy sản phẩm theo danh mục
router.get('/top-purchased', productController.getTopPurchasedProducts); // Lấy sản phẩm được mua nhiều nhất
router.get('/:id', productController.getProductById); // Lấy sản phẩm theo ID

module.exports = router;
