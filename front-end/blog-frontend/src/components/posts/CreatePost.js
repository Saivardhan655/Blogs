import React, { useState } from 'react';
import { createPost } from '../../services/api';

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [media, setMedia] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postFormData = new FormData();
    postFormData.append('title', formData.title);
    postFormData.append('content', formData.content);
    if (media) {
      postFormData.append('media', media);
    }

    try {
      await createPost(postFormData);
      // Redirect to posts list or show success
    } catch (error) {
      console.error('Create post error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Content"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        required
      ></textarea>
      <input type="file" onChange={(e) => setMedia(e.target.files[0])} />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
