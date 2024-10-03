import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [type, setType] = useState('info'); // Default value set to 'info'
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [likes, setLikes] = useState(0);

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('media', media);
    formData.append('type', type);
    formData.append('content', content);
    formData.append('likes', likes);

    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      const response = await axios.post('http://localhost:3000/api/v1/blogs/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Blog post created successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Failed to create blog post');
    }
  };

  return (
    <div className="create-post">
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="info">Info</option>
            <option value="comedy">Comedy</option>
            <option value="religious">Religious</option>
            <option value="sports">Sports</option>
            <option value="politics">Politics</option>
            <option value="cinema">Cinema</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="likes">Likes:</label>
          <input
            type="number"
            id="likes"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="media">Upload Image/Video:</label>
          <input
            type="file"
            id="media"
            onChange={handleMediaChange}
            accept="image/*,video/*"
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
