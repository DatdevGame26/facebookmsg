import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, HistoryOutlined } from '@ant-design/icons';
import './index.scss';
import axios from 'axios'; // Thêm axios để gọi API
import { formatPrice } from '../../utils';
import { notification } from 'antd'; // Nhập notification từ antd

const Personal = () => {
  const navigate = useNavigate();
  const { setIsSignIn, setUser, user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('personalInfo');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [orderHistory, setOrderHistory] = useState([]); // Thêm state để lưu trữ lịch sử đơn hàng
  useEffect(() => {
    if (activeTab === 'orderHistory') {
      const fetchOrderHistory = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:5000/orders/' + user._id, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setOrderHistory(response.data);
        } catch (error) {
          console.error('Error fetching order history', error);
        }
      };

      fetchOrderHistory();
    }
  }, [activeTab]);

  const [isEditing, setIsEditing] = useState(false);
  const [originalInfo, setOriginalInfo] = useState({}); // Lưu trữ thông tin gốc để reset nếu cần
  useEffect(() => {
    // Gọi API để lấy thông tin người dùng khi component mount
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        const response = await axios.get('http://localhost:5000/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { name, email, phone, address } = response.data;
        setUserInfo({ name, email, phone, address });

        setOriginalInfo({ name, email, phone, address }); // Lưu lại thông tin gốc
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);
  const handleInputChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    if (isEditing) {
      // Khi đang trong chế độ chỉnh sửa và người dùng nhấn "Lưu"
      handleSaveChanges();
    } else {
      // Mở chế độ chỉnh sửa
      setIsEditing(true);
    }
  };

  const handleSaveChanges = async () => {
    // Kiểm tra xem tất cả các trường có giá trị không
    const { name, phone, address } = userInfo;
    if (!name || !phone || !address) {
      notification.error({
        message: 'Thông tin không hợp lệ!',
        description: 'Vui lòng điền đầy đủ thông tin vào các trường bắt buộc!',
      });
      return; // Dừng lại nếu có trường bị trống
    }
  
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/users/profile', userInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOriginalInfo(userInfo);
      if (user != null) {
        user.name = userInfo.name;
        user.email = userInfo.email;
        user.phone = userInfo.phone;
        user.address = userInfo.address;
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  const handleCancelChanges = () => {
    setUserInfo(originalInfo);
    setIsEditing(false);
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsSignIn(false);
    setUser(null);
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'personalInfo':
        return (
          <div className="personal_info">
            <div className="name_email">
              <div className="personal_info_component">
                <label>Tên:</label>
                <input
                  type="text"
                  className="input_name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  disabled={!isEditing} // Chỉ cho chỉnh sửa khi ở chế độ chỉnh sửa
                />
              </div>
              <div className="personal_info_component">
                <label>Email:</label>
                <input
                  type="email"
                  className="input_email"
                  name="email"
                  value={userInfo.email}
                  disabled // Email không cho phép chỉnh sửa
                />
              </div>
            </div>
            <div className="personal_info_component">
              <label>Số điện thoại:</label>
              <input
                type="tel"
                className="input_tel"
                name="phone"
                value={userInfo.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="personal_info_component">
              <label>Địa chỉ giao hàng:</label>
              <input
                type="text"
                className="input_adr"
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="change_container">
              {isEditing && (
                <button className="cancel_button" onClick={handleCancelChanges}>
                  Hủy
                </button>
              )}
              <button className="change_button" onClick={handleEditClick}>
                {isEditing ? 'Lưu' : 'Chỉnh sửa'}
              </button>
              <button className="logout_button" onClick={handleLogout}>
                Đăng xuất</button>
            </div>
          </div>
        );
      case 'orderHistory':
        return (
          <div className="order_history">
            <h3>Lịch sử mua hàng</h3>
            {orderHistory.length > 0 ? (
              orderHistory.map((order) => (
                <div key={order._id} className="order_item">
                  <div className="order_summary">
                    <p>Tổng giá: <strong>{formatPrice(order.total_price)}</strong></p>
                    <p>Phương thức thanh toán: <strong>{order.payment_method}</strong></p>
                    <p>Trạng thái: <strong>{order.status}</strong></p>
                    <p>Ngày thanh toán: <strong>{new Date(order.created_at).toLocaleDateString()}</strong></p>
                  </div>
                  <div className="order_items">
                    <h4>Chi tiết sản phẩm:</h4>
                    {order.items.map(item => (
                      <div key={item.productId} className="order_product">
                        <p>Tên sản phẩm: <strong>{item.productId.name}</strong> - Số lượng: <strong>{item.quantity}</strong></p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>Không có đơn hàng nào.</p>
            )}
          </div>
        );
      default:
        return <div className="content">LỖI</div>;
    }
  };

  return (
    <div className="Personal">
      <div className="personal_container">
        <div className="personal_left">
          <div
            className={`personal_left_button info_button ${activeTab === 'personalInfo' ? 'active' : ''
              }`}
            onClick={() => setActiveTab('personalInfo')}
          >
            <UserOutlined />
            <div className="button_text">Thông tin cá nhân</div>
          </div>
          <div
            className={`personal_left_button history_button ${activeTab === 'orderHistory' ? 'active' : ''
              }`}
            onClick={() => setActiveTab('orderHistory')}
          >
            <HistoryOutlined />
            <div className="button_text">Lịch sử mua hàng</div>
          </div>
        </div>
        <div className="personal_right">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Personal;