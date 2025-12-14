import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Important: Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
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
        // Unauthorized - redirect to login only if not already on login/register pages
        if (typeof window !== 'undefined') {
          const currentPath = window.location.pathname;
          if (currentPath !== '/login' && currentPath !== '/register') {
            window.location.href = '/login';
          }
        }
      }

      // Return structured error
      const errorMessage = data?.message || data?.error || 'An error occurred';
      return Promise.reject({
        status,
        message: errorMessage,
        errors: data?.errors || [],
        details: data // Include full data for debugging
      });
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({
        status: 0,
        message: 'No response from server. Please check your connection.',
      });
    } else {
      // Something else happened
      return Promise.reject({
        status: 0,
        message: error.message || 'An unexpected error occurred',
      });
    }
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  loginWith2FA: (userId) => api.post('/auth/login/2fa', { userId }),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/me'),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (token, data) => api.post(`/auth/reset-password/${token}`, data),
};

// 2FA API calls
export const twoFactorAPI = {
  getStatus: () => api.get('/2fa/status'),
  setup: () => api.post('/2fa/setup'),
  verify: (token) => api.post('/2fa/verify', { token }),
  validate: (userId, token, isBackupCode = false) => 
    api.post('/2fa/validate', { userId, token, isBackupCode }),
  disable: (password) => api.post('/2fa/disable', { password }),
  regenerateBackupCodes: (password) => 
    api.post('/2fa/backup-codes/regenerate', { password }),
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

// User API calls
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  getSettings: () => api.get('/user/settings'),
  updateSettings: (settings) => api.put('/user/settings', settings),
  deleteAccount: (password) => api.delete('/user/account', { data: { password } }),
};

// Notification API calls
export const notificationAPI = {
  getAll: (params) => api.get('/notifications', { params }),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  delete: (id) => api.delete(`/notifications/${id}`),
  deleteAll: () => api.delete('/notifications'),
  create: (notification) => api.post('/notifications', notification),
};

// Education API calls
export const educationAPI = {
  getCourses: () => api.get('/education/courses'),
  getCourse: (courseId) => api.get(`/education/courses/${courseId}`),
  updateProgress: (courseId, lessonId) => api.post('/education/progress', { courseId, lessonId }),
  getProgress: () => api.get('/education/progress'),
};

// File Vault API calls
export const fileAPI = {
  upload: (formData, onUploadProgress) => {
    return api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, // 60 seconds for file uploads
      onUploadProgress,
    });
  },
  getAll: (params) => api.get('/files', { params }),
  getById: (id) => api.get(`/files/${id}`),
  download: (id) => {
    return api.get(`/files/${id}/download`, {
      responseType: 'blob',
      timeout: 60000, // 60 seconds for downloads
    }).then(response => response.data); // Return the blob data directly
  },
  update: (id, data) => api.put(`/files/${id}`, data),
  delete: (id) => api.delete(`/files/${id}`),
  deleteMultiple: (fileIds) => api.post('/files/delete-multiple', { fileIds }),
};

// Dashboard API calls
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getActivity: () => api.get('/dashboard/activity'),
};

// ML API calls
export const mlAPI = {
  analyzePassword: (password) => api.post('/ml/analyze-password', { password }),
  checkHealth: () => api.get('/ml/health'),
};

// Scanner API calls
export const scannerAPI = {
  scan: (data) => api.post('/scanner/scan', data),
  quickScan: (data) => api.post('/scanner/quick', data),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
