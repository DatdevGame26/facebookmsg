import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.scss';
import { formatPrice } from '../../utils';
import { AuthContext } from '../../AuthContext';
import { notification } from 'antd';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = location.state || { cartItems: [] };
  const [payment_method, setPaymentMethod] = useState('Trả tiền mặt khi giao hàng');
  const { user } = useContext(AuthContext);

  // State for input fields
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [address, setAddress] = useState(user ? user.address : '');

  const total_price = cartItems.reduce((total, item) => {
    return total + item.productId.price * item.quantity;
  }, 0);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleConfirmPayment = async () => {
    if (!cartItems.length) {
      notification.warning({ message: "Giỏ hàng của bạn đang trống." });
      return;
    }
    if (!name || !phone || !address) {
      notification.warning({ message: "Vui lòng điền đầy đủ các trường bắt buộc." });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/orders/create', {
        userId: user ? user._id : null,
        cartItems: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        total_price,
        payment_method,
        customerInfo: { name, email, phone, address } // Thêm thông tin khách hàng
      });

      if (response.status === 201) {
        notification.success({
          message: 'Thanh toán thành công!',
          description: 'Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn ngay lập tức.',
        });
        navigate('/');
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận thanh toán:", error);
      notification.error({
        message: 'Có lỗi xảy ra khi thanh toán.',
        description: 'Vui lòng thử lại sau.',
      });
    }
  };

  return (
    <div className="Payment">
      <div className="payment_container">
        <div className='payment_title'>Thông tin thanh toán</div>
        {cartItems.length === 0 ? (
          <p>Không có sản phẩm nào trong giỏ hàng để thanh toán.</p>
        ) : (
          <div className="payment-details">
            <ul>
              {cartItems.map((item) => (
                <li key={item._id} className="cart-item">
                  <img
                    src={item.productId.image_url}
                    alt={item.productId.name}
                    className="product-image" />
                  <div className="product-info">
                    <span className="product-name">{item.productId.name}</span>
                    <span className="product-quantity">Số lượng: {item.quantity}</span>
                    <span className="product-total-price">
                      Tổng giá:&nbsp;
                      <strong>{formatPrice(item.productId.price * item.quantity)}</strong>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="total-price">
              <span>
                Tổng giá tất cả sản phẩm:&nbsp;
                <strong className="custom_price">{formatPrice(total_price)}</strong>
              </span>
            </div>

            <div className="all_input_fields">
              <div className="input_field_group">
                <div className="input_field">
                  <label htmlFor="name">Tên <span style={{ color: 'red' }}>*</span></label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="input_field">
                  <label htmlFor="email">Email </label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="input_field">
                <label htmlFor="phone">Điện thoại <span style={{ color: 'red' }}>*</span></label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div className="input_field">
                <label htmlFor="address">Địa chỉ giao hàng <span style={{ color: 'red' }}>*</span></label>
                <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
            </div>

            <div className="payment-method">
              <label htmlFor="payment-select">Phương thức thanh toán:</label>
              <select id="payment-select" value={payment_method} onChange={handlePaymentMethodChange}>
                <option value="Trả tiền mặt khi giao hàng">Trả tiền mặt khi giao hàng</option>
              </select>
            </div>
            <div className="confirm_payment_button_container">
              <button className="confirm_payment_button" onClick={handleConfirmPayment}>
                Xác nhận thanh toán
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
