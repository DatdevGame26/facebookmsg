import React from 'react';
import './index.scss';

// Nhập ảnh từ thư mục của bạn
// import image1 from './path/to/image1.jpg'; // Ảnh minh họa cho quyền lợi khách hàng
// import image2 from './path/to/image2.jpg'; // Ảnh minh họa cho quy trình đặt hàng
// import image3 from './path/to/image3.jpg'; // Ảnh minh họa cho giao hàng
// import image4 from './path/to/image4.jpg'; // Ảnh minh họa cho đổi trả sản phẩm
// import image5 from './path/to/image5.jpg'; // Ảnh minh họa cho bảo mật thông tin

const Policy = () => {
  return (
    <div className="Policy">
      <h1>Chính Sách Bán Hàng của Xanh Tươi</h1>

      <section className="intro">
        <p>
          Chào mừng bạn đến với Xanh Tươi! Chúng tôi cam kết cung cấp thực phẩm sạch, an toàn và chất lượng cao nhất đến tay người tiêu dùng. Chính sách bán hàng của chúng tôi được thiết lập nhằm bảo vệ quyền lợi của khách hàng và đảm bảo sự minh bạch trong các giao dịch.
        </p>
      </section>

      <section className="policy-section">
        <h2>1. Quyền Lợi Khách Hàng</h2>
        <p>
          Tất cả khách hàng đều có quyền nhận được thông tin đầy đủ về sản phẩm mà họ mua, bao gồm nguồn gốc, thành phần, và cách sử dụng. Chúng tôi đảm bảo rằng mọi sản phẩm đều được chứng nhận về chất lượng và an toàn thực phẩm.
        </p>
        <div className="policy_image_container">
          <img src="./images/policy_1.jpg" alt="Quyền lợi khách hàng" className="policy-image" />
        </div>
      </section>

      <section className="policy-section">
        <h2>2. Đặt Hàng và Thanh Toán</h2>
        <p>
          Khách hàng có thể dễ dàng đặt hàng qua trang web hoặc qua điện thoại. Chúng tôi hỗ trợ nhiều hình thức thanh toán, bao gồm chuyển khoản ngân hàng, thẻ tín dụng và thanh toán khi nhận hàng. Đơn hàng sẽ được xác nhận ngay sau khi thanh toán thành công.
        </p>
        <div className="policy_image_container">
          <img src="./images/policy_2.webp" alt="Quy trình đặt hàng" className="policy-image" />
        </div>
      </section>

      <section className="policy-section">
        <h2>3. Giao Hàng</h2>
        <p>
          Chúng tôi cam kết giao hàng đúng hẹn và đảm bảo sản phẩm luôn tươi ngon khi đến tay khách hàng. Thời gian giao hàng sẽ được thông báo cụ thể trong quá trình đặt hàng. Nếu có sự cố xảy ra, chúng tôi sẽ thông báo kịp thời để khách hàng yên tâm.
        </p>
        <div className="policy_image_container">
          <img src="./images/policy_3.avif" alt="Giao hàng" className="policy-image" />
        </div>
      </section>

      <section className="policy-section">
        <h2>4. Đổi Trả Sản Phẩm</h2>
        <p>
          Trong trường hợp sản phẩm bị hư hỏng hoặc không đúng như mô tả, khách hàng có quyền yêu cầu đổi trả trong vòng 7 ngày kể từ ngày nhận hàng. Chúng tôi sẽ kiểm tra và xử lý yêu cầu của bạn nhanh chóng và hiệu quả nhất.
        </p>
        <div className="policy_image_container">
          <img src="./images/policy_4.avif" alt="Đổi trả sản phẩm" className="policy-image" />
        </div>
      </section>

      <section className="policy-section">
        <h2>5. Bảo Mật Thông Tin Khách Hàng</h2>
        <p>
          Tại Xanh Tươi, chúng tôi cam kết bảo mật thông tin cá nhân của khách hàng. Mọi thông tin sẽ chỉ được sử dụng cho mục đích xử lý đơn hàng và sẽ không được chia sẻ cho bên thứ ba mà không có sự đồng ý của khách hàng.
        </p>
        <div className="policy_image_container">
          <img src="./images/policy_5.jpg" alt="Bảo mật thông tin" className="policy-image" />
        </div>
      </section>

      <section className="closing">
        <p>
          Cảm ơn bạn đã tin tưởng và lựa chọn Xanh Tươi. Chúng tôi rất mong muốn được phục vụ bạn và góp phần vào sức khỏe của bạn với những sản phẩm thực phẩm sạch nhất.
        </p>
      </section>
    </div>
  );
};

export default Policy;
