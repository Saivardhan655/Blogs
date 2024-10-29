import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api/v1' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginUser = (formData) => API.post('/auth/login', formData);
export const registerUser = (formData) => API.post('/auth/register', formData);

export const fetchPosts = () => API.get('/posts');
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (formData) => API.post('/posts', formData);
export const likePost = (id) => API.patch(`/posts/${id}/like`);
export const addComment = (id, content) => API.post(`/posts/${id}`, { content });
