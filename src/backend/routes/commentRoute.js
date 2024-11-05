const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/', commentController.getAllComments);
router.post('/', commentController.addComment);
router.get('/:productId', commentController.getCommentsByProductId);
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
