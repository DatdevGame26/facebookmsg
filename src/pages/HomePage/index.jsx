import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faCircleCheck, faTruck } from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import ProductCard from '../../components/ProductCard';

const HomePage = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const toAllProducts = () => {
    navigate('/all-products');
  };

  // Lấy các sản phẩm được mua nhiều nhất khi component mount
  useEffect(() => {
    const fetchTopPurchasedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products/top-purchased');
        setTopProducts(response.data); // Lưu các sản phẩm vào state
      } catch (error) {
        console.error("Error fetching top purchased products:", error);
      } finally {
        setLoading(false); // Đã hoàn thành việc lấy dữ liệu
      }
    };

    fetchTopPurchasedProducts();
  }, []);

  return (
    <div className="HomePage">
      <div className="part_1">
        <img src="./images/clean_food_7.png" alt="" className="main_image" />
        <div className="overlay"></div>
        <div className="content_inside">
          <div className="slogan">
            Thực phẩm sạch, dinh dưỡng vàng
          </div>
          <div className="below_slogan">
            <p>
              Chúng tôi cam kết mang đến cho gia đình bạn những sản phẩm thực phẩm tươi ngon và an toàn nhất, được chọn lọc kỹ càng từ các nông trại sạch đạt chuẩn. <br /> Mời bạn thưởng thức những hương vị tự nhiên tại Xanh Tươi!
            </p>
          </div>
          <Button
            type="primary"
            className="findOutNow_button"
            onClick={toAllProducts}
          >
            Khám phá ngay!
          </Button>
        </div>
      </div>
    
      <div className="part_2">
        <div className="intro_cards">
          <div className="intro_card">
            <FontAwesomeIcon icon={faSeedling} className="intro_card_icon" />
            <div className='intro_card_title'>Thực phẩm tươi ngon</div>
            <div className='intro_card_content'>Chúng tôi cung cấp thực phẩm tươi sạch, an toàn cho sức khỏe gia đình bạn.</div>
          </div>
          <div className="intro_card">
            <FontAwesomeIcon icon={faCircleCheck} className="intro_card_icon" />
            <div className='intro_card_title'>Chứng nhận sạch</div>
            <div className='intro_card_content'>Sản phẩm đạt chuẩn an toàn, bảo vệ sức khỏe người tiêu dùng.</div>
          </div>
          <div className="intro_card">
            <FontAwesomeIcon icon={faTruck} className="intro_card_icon" />
            <div className='intro_card_title'>Giao hàng nhanh chóng</div>
            <div className='intro_card_content'>Giao hàng tiện lợi, giúp bạn dễ dàng tiếp cận thực phẩm sạch mọi lúc.</div>
          </div>
        </div>
      </div>


      <div className="part_3">
        <h2 className="section_title">Sản phẩm được mua nhiều nhất</h2>
        {loading ? (
          <Spin size="large" tip="Đang tải sản phẩm..." />
        ) : (
          <div className="product_list">
            <div className="row">
              {topProducts.slice(0, 5).map((product) => (
                <ProductCard key={product._id} productId={product._id} />
              ))}
            </div>
            <div className="row">
              {topProducts.slice(5, 10).map((product) => (
                <ProductCard key={product._id} productId={product._id} />
              ))}
            </div>
          </div>
        )}
        <Button
          type="primary"
          className="see_more_button"
          onClick={toAllProducts}
        >
          Xem tất cả sản phẩm
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
