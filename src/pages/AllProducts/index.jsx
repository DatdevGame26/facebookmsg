import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Đừng quên import axios nếu bạn chưa có
import './index.scss';
import AllSortButtons from '../../components/AllSortButtons';
import ProductCard from '../../components/ProductCard';
import { Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const AllProducts = () => {
  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('best_selling');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products${category ? `/category/${category}` : ''}`);
        let fetchedProducts = response.data;
  
        // Sắp xếp sản phẩm ngay sau khi fetch
        fetchedProducts = sortProducts(fetchedProducts, sortOption);
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Có lỗi xảy ra khi lấy sản phẩm.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [category, sortOption]); // Thêm sortOption vào dependencies
  

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSortOption('best_selling')
    setCurrentPage(1);
  };

  const sortProducts = (products, sortOption) => {
    const sortedProducts = [...products]; // Sao chép mảng gốc
    switch (sortOption) {
      case 'best_selling':
        return sortedProducts.sort((a, b) => b.purchase_num - a.purchase_num);
      case 'newest':
        return sortedProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'price_asc':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return sortedProducts.sort((a, b) => b.price - a.price);
      default:
        return sortedProducts;
    }
  };
  
  const handleSortChange = (sort) => {
    setSortOption(sort);
    setCurrentPage(1);
  };

  return (
    <div className="AllProducts">
      <div className="welcome_quote">
        <div className="welcome_quote_text">
          Nuôi dưỡng gia đình với những sản phẩm tươi ngon từ thiên nhiên
        </div>
        <img src="./images/clean_food_1.jpg" alt="" className='welcome_quote_img' />
      </div>
      <div className="view_all_products">
        <div className="view_all_products_left">
          <div className="title_category">
            DANH MỤC SẢN PHẨM
          </div>

          <div className="short_line"></div>

          <div className="categoty_button_container">
          <div 
              className={`category_button ${category === '' ? 'selected' : ''}`} 
              onClick={() => handleCategoryChange('')}
            >
              Tất cả
            </div>
            <div 
              className={`category_button ${category === 'Rau củ' ? 'selected' : ''}`} 
              onClick={() => handleCategoryChange('Rau củ')}
            >
              Rau củ
            </div>
            <div 
              className={`category_button ${category === 'Trái cây' ? 'selected' : ''}`} 
              onClick={() => handleCategoryChange('Trái cây')}
            >
              Trái cây
            </div>
            <div 
              className={`category_button ${category === 'Thịt' ? 'selected' : ''}`} 
              onClick={() => handleCategoryChange('Thịt')}
            >
              Thịt
            </div>
            <div 
              className={`category_button ${category === 'Hải sản' ? 'selected' : ''}`} 
              onClick={() => handleCategoryChange('Hải sản')}
            >
              Hải sản
            </div>
            <div 
              className={`category_button ${category === 'Đồ khô' ? 'selected' : ''}`} 
              onClick={() => handleCategoryChange('Đồ khô')}
            >
              Đồ khô
            </div>
          </div>
        </div>
        <div className="view_all_products_right">
          <AllSortButtons onSortChange={handleSortChange} selectedSort={sortOption}/>
          <div className="all_category_products">
            <div className="product_grid">
              {loading ? (
                <p>Đang tải sản phẩm...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                currentProducts.map((product) => (
                  <ProductCard key={product._id} productId={product._id} />
                ))
              )}
            </div>
            <div className="pagination">
              <Button
                type="primary"
                icon={<ArrowLeftOutlined className="icon" />}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className='pagination_button'
              />
              <span>
                {currentPage} / {totalPages}
              </span>
              <Button
                type="primary"
                icon={<ArrowRightOutlined className="icon" />}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className='pagination_button'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
