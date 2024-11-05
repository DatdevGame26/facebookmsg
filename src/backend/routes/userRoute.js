const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/profile', auth, userController.updateProfile);
router.get('/profile', auth, userController.getUserProfile);

module.exports = router;
