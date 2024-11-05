import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import './index.scss';
import axios from 'axios';

const CommentSection = ({ productId }) => {
  const { isSignIn, user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/comments/${productId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy bình luận:", error);
      }
    };

    fetchComments();
  }, [productId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    try {
      const response = await axios.post('http://localhost:5000/comments', {
        userId: user._id,
        content: newComment,
        productId
      });

      const newCommentData = {
        ...response.data,
        userId: {
          _id: user._id,
          name: user.name
        }
      };

      setComments([...comments, newCommentData]);
      setNewComment('');
      setShowCommentForm(false);
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };

  const handleShowCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  return (
    <div className="CommentSection">
      <h3>Bình luận</h3>
      {!isSignIn ? (
        <p>(Đăng nhập để bình luận)</p>
      ) : (
        <>
          <div className="write_comment_container">
            <button
              onClick={handleShowCommentForm}
              className='write_comment'
            >
              {showCommentForm ? 'Huỷ' : 'Tạo bình luận mới'}
            </button>
            {showCommentForm && (
              <form onSubmit={handleCommentSubmit} className="comment_form">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Viết bình luận của bạn"
                  required
                  className='comment_textarea'
                />
                <button type="submit" className='comment_submit'>Đăng</button>
              </form>
            )}
          </div>
        </>
      )}

      <div className="comment_list">
        {comments.map(comment => (
          <div className="Comment" key={comment._id}>
            <div className="upper_comment">
              <div className="user_name">{comment.userId?.name || "Người bình luận"}</div>
              <div className="comment_date">Đăng ngày {new Date(comment.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="lower_comment">
              {comment.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
