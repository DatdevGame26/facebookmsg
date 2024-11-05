const Comment = require('../models/Comment');

const addComment = async (req, res) => {
    try {
        const { userId, content, productId } = req.body;
        const newComment = new Comment({ userId, content, productId });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('userId', 'name');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCommentsByProductId = async (req, res) => {
    try {
        const comments = await Comment.find({ productId: req.params.productId })
            .populate('userId', 'name')
            .sort({ createdAt: -1 });

        // Lọc ra những bình luận không có người dùng
        const filteredComments = comments.filter(comment => comment.userId !== null);

        res.status(200).json(filteredComments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addComment,
    getAllComments,
    getCommentsByProductId,
    deleteComment
};
