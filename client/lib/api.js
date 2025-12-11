import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Important: Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add additional headers or logging here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      if (status === 401) {
        // Unauthorized - redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }

      // Return structured error
      return Promise.reject({
        status,
        message: data.message || 'An error occurred',
        errors: data.errors || []
      });
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({
        message: 'No response from server. Please check your connection.',
      });
    } else {
      // Something else happened
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
      });
    }
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/me'),
};

// Password/Credentials API calls
export const passwordAPI = {
  getAll: () => api.get('/passwords'),
  getById: (id) => api.get(`/passwords/${id}`),
  add: (credentialData) => api.post('/passwords', credentialData),
  update: (id, credentialData) => api.put(`/passwords/${id}`, credentialData),
  delete: (id) => api.delete(`/passwords/${id}`),
  decrypt: (id) => api.post(`/passwords/${id}/decrypt`),
  getStats: () => api.get('/passwords/stats/strength'),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
