import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../constants/appConstants';

// Create axios instance with default config
const api = (axios.create || (() => axios))({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/';
    } else if (error.response) {
      // Handle different HTTP error statuses
      const status = error.response.status;
      let errorMessage = 'An error occurred';

      if (status === 400) {
        errorMessage = 'Bad request: ' + (error.response.data?.message || 'Invalid data');
      } else if (status === 403) {
        errorMessage = 'Forbidden: You do not have permission to access this resource';
      } else if (status === 404) {
        errorMessage = 'Resource not found';
      } else if (status === 500) {
        errorMessage = 'Server error: Please try again later';
      } else if (status >= 500) {
        errorMessage = 'Server unavailable: Please try again later';
      }

      // Add the error message to the error object for better handling
      error.message = errorMessage;
      error.userMessage = errorMessage;
    } else if (error.request) {
      // Request was made but no response received
      error.message = 'Network error: No response from server';
      error.userMessage = 'Network error: Please check your connection';
    } else {
      // Something happened in setting up the request
      error.message = 'Request setup error: ' + error.message;
      error.userMessage = 'Request failed: Please try again';
    }

    return Promise.reject(error);
  }
);

// Validation utilities
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateUserData = (userData) => {
  const errors = [];

  if (!userData.email || !validateEmail(userData.email)) {
    errors.push('Valid email is required');
  }

  if (!userData.password || !validatePassword(userData.password)) {
    errors.push('Password must be at least 6 characters');
  }

  if (!userData.name || userData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  return errors.length > 0 ? errors : null;
};

const validateAgentData = (data) => {
  const errors = [];

  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message cannot be empty');
  }

  if (data.message.length > 1000) {
    errors.push('Message is too long (max 1000 characters)');
  }

  return errors.length > 0 ? errors : null;
};

const validateRewardData = (data) => {
  const errors = [];

  if (!data.user_id || isNaN(data.user_id)) {
    errors.push('Valid user ID is required');
  }

  if (!data.achievement_type || data.achievement_type.trim().length === 0) {
    errors.push('Achievement type is required');
  }

  if (!data.points || isNaN(data.points) || data.points <= 0) {
    errors.push('Valid positive points value is required');
  }

  return errors.length > 0 ? errors : null;
};

// API Service Methods with validation
export const apiService = {
  // Authentication
  auth: {
    login: (credentials) => {
      if (!credentials.email || !credentials.password) {
        return Promise.reject(new Error('Email and password are required'));
      }
      return api.post('/api/auth/login', credentials);
    },
    register: (userData) => {
      const validationErrors = validateUserData(userData);
      if (validationErrors) {
        return Promise.reject(new Error(validationErrors.join(', ')));
      }
      return api.post('/register', userData);
    },
    logout: () => api.post('/api/auth/logout'),
    refreshToken: () => api.post('/api/auth/refresh'),
  },

  // Agent endpoints
  agent: {
    sendMessage: (data) => {
      const validationErrors = validateAgentData(data);
      if (validationErrors) {
        return Promise.reject(new Error(validationErrors.join(', ')));
      }
      return api.post('/agent', data);
    },
    getHistory: (teamId) => {
      if (!teamId) {
        return Promise.reject(new Error('Team ID is required'));
      }
      return api.get(`/api/agent/history/${teamId}`);
    },
  },

  // Admin endpoints
  admin: {
    getRewards: () => api.get('/api/admin/rewards'),
    applyReward: (data) => {
      const validationErrors = validateRewardData(data);
      if (validationErrors) {
        return Promise.reject(new Error(validationErrors.join(', ')));
      }
      return api.post('/reward', data);
    },
    getLogs: (params) => {
      // Validate params if needed
      if (params && (params.limit && isNaN(params.limit))) {
        return Promise.reject(new Error('Invalid limit parameter'));
      }
      return api.get('/logs', { params });
    },
    registerTeam: (data) => api.post('/api/admin/register', data),
    getTeams: () => api.get('/api/admin/teams'),
    getProjects: () => api.get('/api/admin/projects'),
    getSubmissions: () => api.get('/api/admin/submissions'),
    getParticipants: () => api.get('/api/admin/participants'),
  },

  // System endpoints
  system: {
    health: () => api.get('/api/system/health'),
    status: () => api.get('/api/system/status'),
  },

  // Teams
  teams: {
    getAll: () => api.get('/api/teams'),
    getById: (id) => api.get(`/api/teams/${id}`),
    create: (data) => api.post('/api/teams', data),
    update: (id, data) => api.put(`/api/teams/${id}`, data),
    delete: (id) => api.delete(`/api/teams/${id}`),
    join: (id) => api.post(`/api/teams/${id}/join`),
    leave: (id) => api.post(`/api/teams/${id}/leave`),
  },

  // Projects
  projects: {
    getAll: () => api.get('/api/projects'),
    getById: (id) => api.get(`/api/projects/${id}`),
    create: (data) => api.post('/api/projects', data),
    update: (id, data) => api.put(`/api/projects/${id}`, data),
    delete: (id) => api.delete(`/api/projects/${id}`),
    submit: (id, data) => api.post(`/api/projects/${id}/submit`, data),
  },

  // Submissions
  submissions: {
    getAll: () => api.get('/api/submissions'),
    getById: (id) => api.get(`/api/submissions/${id}`),
    getByTeam: (teamId) => api.get(`/api/submissions/team/${teamId}`),
    create: (data) => api.post('/api/submissions', data),
    update: (id, data) => api.put(`/api/submissions/${id}`, data),
  },

  // Leaderboard
  leaderboard: {
    get: () => api.get('/api/leaderboard'),
    getByTrack: (track) => api.get(`/api/leaderboard/track/${track}`),
  },

  // User profile
  user: {
    getProfile: () => api.get('/api/user/profile'),
    updateProfile: (data) => api.put('/api/user/profile', data),
    getStats: () => api.get('/api/user/stats'),
  },
};

export default api;