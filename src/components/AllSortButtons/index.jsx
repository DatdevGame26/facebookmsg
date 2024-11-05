import React from 'react';
import './index.scss';

const AllSortButtons = ({ onSortChange, selectedSort }) => {
  return (
    <div className="AllSortButtons">
      <button 
        onClick={() => onSortChange('best_selling')} 
        className={`sort_button ${selectedSort === 'best_selling' ? 'selected' : ''}`}
      >
        Bán chạy nhất
      </button>
      <button 
        onClick={() => onSortChange('newest')} 
        className={`sort_button ${selectedSort === 'newest' ? 'selected' : ''}`}
      >
        Mới nhất
      </button>
      <button 
        onClick={() => onSortChange('price_asc')} 
        className={`sort_button ${selectedSort === 'price_asc' ? 'selected' : ''}`}
      >
        Giá thấp - cao
      </button>
      <button 
        onClick={() => onSortChange('price_desc')} 
        className={`sort_button ${selectedSort === 'price_desc' ? 'selected' : ''}`}
      >
        Giá cao - thấp
      </button>
    </div>
  );
};

export default AllSortButtons;
