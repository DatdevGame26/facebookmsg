import React, { useState, useEffect } from 'react';
import './index.scss';
import AllSortButtons from '../../components/AllSortButtons';
import ProductCard from '../../components/ProductCard';
import { Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResult = () => {
  const query = useQuery();
  const keyword = query.get("keyword");

  const itemsPerPage = 15;
  const [products, setProducts] = useState([]);
  const [fetchedProducts, setFetchedProducts] = useState([]); // Sản phẩm gốc
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('best_selling');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/products/search?keyword=${encodeURIComponent(keyword)}`);
        const products = response.data;
        setFetchedProducts(products); // Lưu sản phẩm gốc
        setProducts(sortProducts(products, sortOption)); // Sắp xếp ngay lập tức
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    if (keyword) {
      fetchProducts();
      setCurrentPage(1);
    }
  }, [keyword]); // Chỉ gọi API khi keyword thay đổi

  const sortProducts = (products, sortOption) => {
    switch (sortOption) {
      case 'best_selling':
        return products.sort((a, b) => b.purchase_num - a.purchase_num);
      case 'newest':
        return products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'price_asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return products.sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const handleSortChange = (sort) => {
    setSortOption(sort);
    setProducts(sortProducts([...fetchedProducts], sort)); // Sắp xếp từ sản phẩm gốc
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (loading) {
    return <div>Đang tìm kiếm sản phẩm...</div>;
  }

  if (products.length === 0) {
    return (
      <div className='noResult'>
        Không tìm thấy kết quả nào với từ khoá <span className="highlight">"{keyword}"</span>
      </div>
    );
  }

  return (
    <div className="SearchResult">
      <div className="result_found">
        Tìm thấy <span className="highlight">{products.length}</span> kết quả với từ khoá <span className="highlight">"{keyword}"</span>
      </div>
      <AllSortButtons onSortChange={handleSortChange} selectedSort={sortOption} />
      <div className="all_result_found">
        <div className="product_grid">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} productId={product._id} />
          ))}
        </div>
        <div className="pagination">
          <Button
            type="primary"
            icon={<ArrowLeftOutlined className="icon" />}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="pagination_button"
          />
          <span>
            {currentPage} / {totalPages}
          </span>
          <Button
            type="primary"
            icon={<ArrowRightOutlined className="icon" />}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="pagination_button"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
