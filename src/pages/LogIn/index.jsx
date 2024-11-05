import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { notification } from 'antd'; 
import './index.scss';

const LogIn = () => {
  const { setIsSignIn, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Tải email và mật khẩu từ localStorage nếu có
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    const storedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (storedRememberMe) {
      setEmail(storedEmail || '');
      setPassword(storedPassword || '');
      setRememberMe(storedRememberMe);
    }
  }, []);

  const toSignUp = () => {
    navigate('/sign-up');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        notification.success({
          message: 'Đăng nhập thành công!',
          description: `Xin chào ${data.user.name}.`,
        });
        console.log('Đăng nhập thành công!');
        localStorage.setItem('token', data.token);

        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          localStorage.removeItem('rememberMe');
        }

        navigate('/');
        setIsSignIn(true);
        setUser(data.user); // Lưu thông tin người dùng
        console.log(data);
      } else {
        setErrorMessage(data.msg || 'Có lỗi xảy ra.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Không thể kết nối đến máy chủ.');
    }
  };

  return (
    <div className="LogIn">
      <div className="login_container">
        <div className="title">Đăng Nhập</div>
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
          <div className="rememberMe">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Nhớ mật khẩu</label>
          </div>
          {errorMessage && <div className="error_message">{errorMessage}</div>}
          <button type="submit" className="submit_button">Đăng Nhập</button>
          <div className="noAccountSignUp">
            Bạn chưa có tài khoản? Hãy <span onClick={toSignUp} className="signup_link">Đăng ký</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
