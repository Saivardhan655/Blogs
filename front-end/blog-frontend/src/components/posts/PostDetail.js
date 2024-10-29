import React, { useState, useEffect } from 'react';
import { fetchPost, addComment } from '../../services/api';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const getPost = async () => {
      const { data } = await fetchPost(id);
      setPost(data.post);
    };
    getPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComment(id, comment);
      setComment('');
      setPost({ ...post, comments: [...post.comments, { content: comment }] });
    } catch (error) {
      console.error('Comment error', error);
    }
  };

  return (
    <div>
      {post && (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <h3>Comments</h3>
          {post.comments.map((c, idx) => (
            <p key={idx}>{c.content}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
