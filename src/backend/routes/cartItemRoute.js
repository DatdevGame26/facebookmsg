const express = require('express');
const cartItemController = require('../controllers/cartItemController');
const router = express.Router();

router.get('/', cartItemController.getAllCartItems); 

router.post('/', cartItemController.createCartItem); 
router.get('/:id', cartItemController.getCartItemById); 
router.put('/:id', cartItemController.updateCartItem); 
router.delete('/:id', cartItemController.deleteCartItem);

module.exports = router;