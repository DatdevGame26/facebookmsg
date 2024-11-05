import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Nhập useNavigate để điều hướng
import './index.scss';
import CartItem from '../../components/CartItem';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/cart-items');
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleCartUpdate = () => {
    fetchCartItems();
  };

  const handleNavigateToProducts = () => {
    navigate('/all-products'); // Điều hướng đến trang sản phẩm
  };

  const handleNavigateToPayment = () => {
    navigate('/payment', { state: { cartItems } }); // Truyền cartItems vào state
};


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Cart">
      <div className="cart_container">
        <div className="cart_top">Giỏ hàng của bạn</div>
        <div className="cart_bottom">
          {cartItems.length === 0 ? ( // Kiểm tra xem giỏ hàng có trống không
            <div className='empty_cart_line'>
              Giỏ của bạn đang trống không. Bạn có muốn{' '}
              <span
                className="to_cart"
                onClick={handleNavigateToProducts}>mua gì không?</span>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <CartItem key={item._id} cartItemId={item._id} onCartUpdate={handleCartUpdate} />
              ))}
              <div className="payment_button_container">
                <button
                  onClick={handleNavigateToPayment}
                  className='payment_button'>
                  Thanh toán
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
