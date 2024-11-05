import React from 'react';
import './index.scss';
import { FacebookFilled, InstagramFilled, YoutubeFilled } from '@ant-design/icons';


const Footer = () => {
  return (
    <div className="Footer">
      <div className="upper_footer">
        <img src="./icons/logo (white).png" alt="" className='logo_footer' />
        <div className="upper_footer_item">
          <div className="item_title">Về chúng tôi</div>
          <div className="item_content">
            Xanh Tươi cam kết mang đến những sản phẩm thực phẩm sạch, an toàn và chất lượng nhất cho gia đình bạn.
          </div>
        </div>
        <div className="upper_footer_item">
          <div className="item_title">Liên hệ</div>
          <div className="item_content">
            Địa chỉ: 123 Đường X, Thành phố Y
            <br />
            Điện thoại: (123) 456-7890
            <br />
            Email: contact@xanhtoi.com
          </div>
        </div>
        <div className="upper_footer_item">
          <div className="item_title">Kết nối với chúng tôi</div>
          <FacebookFilled className='media_logo' />
          <InstagramFilled className='media_logo' />
          <YoutubeFilled className='media_logo' />
        </div>
      </div>
      <div className="lower_footer">
        ©2024 Xanh Tươi. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
