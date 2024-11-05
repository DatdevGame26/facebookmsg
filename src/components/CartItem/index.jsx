import React, { useState, useEffect } from 'react';
import './index.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import { DeleteFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { formatPrice } from '../../utils';

const CartItem = ({ cartItemId, onCartUpdate }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cartItem, setCartItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cart-items/${cartItemId}`);
        setCartItem(response.data);
        setQuantity(response.data.quantity);
      } catch (error) {
        console.error('Error fetching cart item:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cartItemId]);


  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    updateQuantity(newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      updateQuantity(newQuantity);
    }
  };

  const updateQuantity = async (newQuantity) => {
    try {
      const updatedCartItem = { ...cartItem, quantity: newQuantity };
      await axios.put(`http://localhost:5000/cart-items/${cartItemId}`, updatedCartItem);
      setQuantity(newQuantity);
      onCartUpdate(); 
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const deleteCartItem = async () => {
    try {
      await axios.delete(`http://localhost:5000/cart-items/${cartItemId}`);
      onCartUpdate(); 
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const total_price = cartItem ? cartItem.productId.price * quantity : 0;

  return (
    <div className="CartItem">
      {loading ? (
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      ) : (
        cartItem && (
          <div className="cart_item_container">
            
            <div className="part_product right_product">
              <img
                src={cartItem.productId.image_url}
                alt={cartItem.productId.name}
                className="product_image"
              />
              <div className="product_name">{cartItem.productId.name}</div>
            </div>

            <div className="part_product left_product">
              <div className="product_price">{formatPrice(total_price)}</div> {/* Hiển thị tổng giá */}
              <div className="two_button">
                <div>Số lượng</div>
                <div className="quantity_control">
                  <Button
                    icon={<MinusOutlined />}
                    onClick={decreaseQuantity}
                    className="quantity_control_button"
                  />
                  <span className="quantity_display">{quantity}</span>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={increaseQuantity}
                    className="quantity_control_button"
                  />
                </div>
                <Button
                  type="primary"
                  icon={<DeleteFilled className="icon" />}
                  className="delete_button"
                  onClick={deleteCartItem} // Xóa sản phẩm khi nhấn nút delete
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CartItem;
