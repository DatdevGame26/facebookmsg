import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { Input, Button } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const { isSignIn, setIsSignIn, user} = useContext(AuthContext);

  const navigate = useNavigate();
  const handlePathClick = (path) => {
    navigate(path);
  };
  const handleSearch = () => {
    if (keyword.trim() === '') {
      alert('Từ khóa không được trống!');
      return;
    }
    navigate(`/search-result?keyword=${encodeURIComponent(keyword)}`);
    setKeyword('')
  };
  const toCartPage = () => {
    navigate('/cart')
  }
  const toPersonalPage = () => {
    navigate('/personal')
  }
  const toLogInPage = () => {
    navigate('/log-in')
  }
  const toSignUpPage = () => {
    navigate('/sign-up')
  }
  const toPolicyPage = () => {
    navigate('/policy')
  }
  useEffect(() => {
    if (user) {
      setIsSignIn(true);
    }else setIsSignIn(false)
  }, [setIsSignIn]);

  return (
    <div className="Header">
      <div className="upper-header">
        <img
          src="./icons/logo 3.png"
          alt="Logo"
          className="logo"
          onClick={() => handlePathClick('/')}
        />

        <Input
          placeholder="Tìm kiếm sản phẩm..."
          className="search-bar"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onPressEnter={handleSearch}  // Kích hoạt tìm kiếm khi nhấn Enter
        />
        <Button
          type="primary"
          icon={<SearchOutlined className="icon" />}
          className="search-button"
          onClick={handleSearch} // Kích hoạt tìm kiếm khi nhấn nút
        />

        <Button type="link"
          icon={<ShoppingCartOutlined className="icon" />}
          className="cart-button"
          onClick={toCartPage}
        />
        {isSignIn ? (
          <Button
            type="link"
            icon={<UserOutlined className="icon" />}
            className="account-button"
            onClick={toPersonalPage}
          />
        ) : (
          <div >
            <span
              className='login_title'
              onClick={toLogInPage}
            >Đăng nhập</span>/
            <span
              className='signup_title'
              onClick={toSignUpPage}
            >Đăng ký</span>

          </div>
        )}
      </div>
      <div className="lower-header">
      <div 
        className="nav-item" 
        onClick={() => handlePathClick('/')}
        >Trang chủ</div>
        <div 
        className="nav-item" 
        onClick={() => handlePathClick('/all-products')}
        >Sản Phẩm</div>
        <div 
        className="nav-item"
        onClick={toPolicyPage}>Chính sách</div>


      </div>
    </div>
  );
};

export default Header;
