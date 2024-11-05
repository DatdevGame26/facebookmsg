import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd'; 
import './index.scss'; // Import file SCSS

const SignUp = () => {
  const navigate = useNavigate();
  
  const toLogIn = () => {
    navigate('/log-in');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log('Response from server:', data); 
  
      if (response.ok) {
        notification.success({
          message: 'Đăng ký thành công',
          description: 'Bạn đã đăng ký thành công. Hãy đăng nhập để tiếp tục.',
        });
        navigate('/log-in');
      } else {
        setErrorMessage(data.msg || 'Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Không thể kết nối đến máy chủ.');
    }
  };

  return (
    <div className="SignUp">
      <div className="signup_container">
        <div className="title">Đăng Ký</div>
        <form onSubmit={handleSubmit} className="form">
          <div className="inputContainer">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
              placeholder='ngvana@gmail.com'
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          {/* Hiển thị thông báo lỗi nếu có */}
          {errorMessage && <div className="error_message">{errorMessage}</div>}
          <button type="submit" className="submit_button">Đăng Ký</button>
          <div>Bạn đã có tài khoản? Hãy <span onClick={toLogIn} className='login_link'>Đăng nhập</span></div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
