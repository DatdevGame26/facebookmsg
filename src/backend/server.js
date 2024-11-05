const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoute = require('./routes/productRoute');
const cartItemRoute = require('./routes/cartItemRoute');
const userRoute = require('./routes/userRoute');
const commentRoute = require('./routes/commentRoute');
const orderRoute = require('./routes/orderRoute');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

(async () => {
  try {
    await mongoose.connect('mongodb+srv://trolldatvl:1223334444@cluster0.u1bub.mongodb.net/CleanFood');
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
})();

// Sử dụng các routes
app.use('/products', productRoute);
app.use('/cart-items', cartItemRoute);
app.use('/users', userRoute);
app.use('/comments', commentRoute);
app.use('/orders', orderRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
