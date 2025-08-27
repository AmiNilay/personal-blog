import axios from 'axios';

// The base URL for your backend server.
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

/* 
  This is a critical step for authentication.
  We will add an interceptor that attaches the JWT token to every single request 
  if the user is logged in. We'll build the login page next so this can be used.
*/
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});


// === POST FUNCTIONS ===
export const fetchPosts = () => API.get('/posts');
export const fetchPostById = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.put(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// === TAG FUNCTIONS ===
// THIS IS THE MISSING FUNCTION
export const fetchPostsByTag = (tagName) => API.get(`/posts/tag/${tagName}`);

// === COMMENT FUNCTIONS ===
export const fetchComments = (postId) => API.get(`/posts/${postId}/comments`);
export const createComment = (postId, newComment) => API.post(`/posts/${postId}/comments`, newComment);

// === AUTH FUNCTIONS ===
export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users/register', formData);