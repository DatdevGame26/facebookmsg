const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.REACT_APP_JWT_SECRET;

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Received email and password:', email, password);

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Hashed password:', hashedPassword);

    // Lấy phần tên từ email
    const name = email.split('@')[0];

    user = new User({ email, password: hashedPassword, name });
    await user.save();

    console.log('User created:', user);

    const payload = { userId: user._id };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Signup error:', err.message);  // Log chi tiết lỗi
    res.status(500).json({ msg: 'Server error' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Tài khoản không tồn tại!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Mật khẩu không đúng!' });

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token, user }); // Trả về cả token và thông tin người dùng
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};



const updateProfile = async (req, res) => {
  const { name, phone, address } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, phone, address, updatedAt: Date.now() },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  signup,
  login,
  updateProfile,
  getUserProfile,
};