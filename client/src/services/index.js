import apiClient from './apiClient';

export const authService = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
};

export const postService = {
  getPosts: () => apiClient.get('/posts'),
  createPost: (data) => apiClient.post('/posts', data),
  updatePost: (id, data) => apiClient.put(`/posts/${id}`, data),
  deletePost: (id) => apiClient.delete(`/posts/${id}`),
  likePost: (id) => apiClient.post(`/posts/${id}/like`),
  addComment: (id, data) => apiClient.post(`/posts/${id}/comment`, data),
};

export const userService = {
  getCurrentUser: () => apiClient.get('/users/me'),
  getUserProfile: (id) => apiClient.get(`/users/${id}`),
  updateProfile: (data) => apiClient.put('/users/me', data),
  addConnection: (userId) => apiClient.post(`/users/${userId}/connect`),
};
