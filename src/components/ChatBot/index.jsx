import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

function ChatBot() {
  const [isChatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  useEffect(() => {
    // Tạo thẻ script mới cho Tawk.to
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://embed.tawk.to/672a30732480f5b4f5990505/1ibucqhcf';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Thêm script vào body
    document.body.appendChild(script);

    // Clean up: loại bỏ script khi component bị unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="chatbot-container">
      <button onClick={toggleChat}>
        <FontAwesomeIcon icon={faRobot} />
      </button>
      {isChatOpen && (
        <div className="chat-window">
          {/* Nội dung cửa sổ chat có thể được thêm ở đây */}
        </div>
      )}
    </div>
  );
}

export default ChatBot;
