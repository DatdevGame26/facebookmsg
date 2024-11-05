import React, { useState, useEffect } from 'react';
import './index.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EyeFilled } from '@ant-design/icons';
import { formatPrice } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const ProductCard = ({ productId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [product, setProduct] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } 
    };
    fetchData();
  }, [productId]);

  let name = ""
  let origin = ""
  let description = ""
  let price = 0
  let purchase_num = 0;
  let image_url = ""

  if (product != null) {
    name = product.name
    description = product.description
    origin = product.origin
    price = product.price
    image_url = product.image_url
    purchase_num = product.purchase_num
  }

  const handleCardClick = () => {
    navigate(`/view-product/${productId}`); // Chuyển hướng đến ViewProduct
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleIconClick = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="ProductCard_Container">
      <div
        className="ProductCard"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        {isHovered && (
          <EyeFilled
            className="eye_icon"
            onClick={(e) => {
              e.stopPropagation(); // Ngăn sự kiện click lan tỏa lên ProductCard
              handleIconClick();
            }}
          />
        )}

        <div className='product_image_container'>
          {!imageLoaded && (
            <div className="loadingSpinnerCard">
              <FontAwesomeIcon icon={faSpinner} spin/>
            </div>
          )}
          <img
            src={image_url}
            alt=""
            className='product_image'
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        </div>
        <div className="product_name">{name}</div>
        <div className="product_price">{formatPrice(price)}</div>
      </div>

      {showInfo && (
        <div className="product_info_container" onClick={handleIconClick}>
          <div className="product_info">
            <div className='product_image_container'>
              <img
                src={image_url}
                alt={name}
                className='product_image'
              />
            </div>
            <div className="product_info_summary">
              <div className='product_info_summary_name'><strong>{name}</strong></div>
              <div><strong>Nguồn gốc:</strong>  {origin}</div>
              <div><strong>Lượt mua:</strong> {purchase_num}</div>
              <div>{description}</div>
              <div>Giá: <span>{formatPrice(price)}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
