import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './index.scss';
import axios from 'axios';
import { Button, notification } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { formatPrice } from '../../utils';
import ProductCard from '../../components/ProductCard';
import CommentSection from '../../components/CommentSection';

const ViewProduct = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      if (product) {
        try {
          const response = await axios.get(`http://localhost:5000/products/category/${product.category}`);
          const filteredProducts = response.data.filter(p => p._id !== product._id).slice(0, 5);
          setSuggestedProducts(filteredProducts);
        } catch (error) {
          console.error('Error fetching suggested products:', error);
        }
      }
    };

    fetchSuggestedProducts();
  }, [product]);

  if (loading || product == null) {
    return null;
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cart-items');
      const cartItems = response.data;

      const existingCartItem = cartItems.find(item => item.productId._id === product._id);

      if (existingCartItem) {
        const updatedQuantity = existingCartItem.quantity + quantity;
        await axios.put(`http://localhost:5000/cart-items/${existingCartItem._id}`, {
          quantity: updatedQuantity
        });
      } else {
        const newCartItem = {
          productId: product._id,
          quantity: quantity,
        };
        await axios.post('http://localhost:5000/cart-items', newCartItem);
      }

      // Hiển thị thông báo thành công
      notification.success({
        message: 'Thêm vào giỏ hàng thành công!',
        description: `Bạn đã thêm ${quantity} sản phẩm ${product.name} vào giỏ hàng.`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="ViewProduct">
      <div className="view_product_container">
        <div className="view_product_left">
          <div className="product_image_container">
            <img src={product.image_url} alt="" className="product_image" />
          </div>
        </div>
        <div className="view_product_right">
          <div className="product_name"> {product.name}</div>
          <div className="product_price"><strong>{formatPrice(product.price)}</strong></div>
          <div className="product_origin"> <strong>Nguồn gốc:</strong> {product.origin}</div>
          <div className="product_description">{product.description}</div>

          <div className="quantity_control">
            <Button icon={<MinusOutlined />} onClick={decreaseQuantity} className='quantity_control_button' />
            <span className="quantity_display">{quantity}</span>
            <Button icon={<PlusOutlined />} onClick={increaseQuantity} className='quantity_control_button' />
          </div>

          <Button type="primary" className="add_to_cart_button" onClick={addToCart}>
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>

      {/* Suggested products section */}
      <div className="suggested_products">
        <h3>Sản phẩm cùng loại</h3>
        <div className="suggested_products_list">
          {suggestedProducts.map(product => (
            <ProductCard key={product._id} productId={product._id} />
          ))}
        </div>
      </div>
      <CommentSection productId={product._id}/>
    </div>
  );
};

export default ViewProduct;
