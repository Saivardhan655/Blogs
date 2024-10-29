import React, { useState, useEffect } from 'react';
import { fetchPosts, likePost } from '../../services/api';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await fetchPosts();
      setPosts(data.posts);
    };
    getPosts();
  }, []);

  const handleLike = async (id) => {
    try {
      await likePost(id);
      setPosts(posts.map(post => post._id === id ? { ...post, likes: post.likes + 1 } : post));
    } catch (error) {
      console.error('Like error', error);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <Link to={`/posts/${post._id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.content}</p>
          <button onClick={() => handleLike(post._id)}>Like ({post.likes})</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
