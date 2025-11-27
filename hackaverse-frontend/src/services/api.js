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
    }
    return Promise.reject(error);
  }
);

// API Service Methods
export const apiService = {
  // Authentication
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout'),
    refreshToken: () => api.post('/auth/refresh'),
  },

  // Agent endpoints
  agent: {
    sendMessage: (data) => api.post('/agent/', data),
    getHistory: (teamId) => api.get(`/agent/history/${teamId}`),
  },

  // Admin endpoints
  admin: {
    getRewards: () => api.get('/admin/rewards'),
    applyReward: (data) => api.post('/admin/reward', data),
    getLogs: (params) => api.get('/admin/logs', { params }),
    registerTeam: (data) => api.post('/admin/register', data),
    getTeams: () => api.get('/admin/teams'),
    getProjects: () => api.get('/admin/projects'),
    getSubmissions: () => api.get('/admin/submissions'),
    getParticipants: () => api.get('/admin/participants'),
  },

  // System endpoints
  system: {
    health: () => api.get('/system/health'),
    status: () => api.get('/system/status'),
  },

  // Teams
  teams: {
    getAll: () => api.get('/teams'),
    getById: (id) => api.get(`/teams/${id}`),
    create: (data) => api.post('/teams', data),
    update: (id, data) => api.put(`/teams/${id}`, data),
    delete: (id) => api.delete(`/teams/${id}`),
    join: (id) => api.post(`/teams/${id}/join`),
    leave: (id) => api.post(`/teams/${id}/leave`),
  },

  // Projects
  projects: {
    getAll: () => api.get('/projects'),
    getById: (id) => api.get(`/projects/${id}`),
    create: (data) => api.post('/projects', data),
    update: (id, data) => api.put(`/projects/${id}`, data),
    delete: (id) => api.delete(`/projects/${id}`),
    submit: (id, data) => api.post(`/projects/${id}/submit`, data),
  },

  // Submissions
  submissions: {
    getAll: () => api.get('/submissions'),
    getById: (id) => api.get(`/submissions/${id}`),
    getByTeam: (teamId) => api.get(`/submissions/team/${teamId}`),
    create: (data) => api.post('/submissions', data),
    update: (id, data) => api.put(`/submissions/${id}`, data),
  },

  // Leaderboard
  leaderboard: {
    get: () => api.get('/leaderboard'),
    getByTrack: (track) => api.get(`/leaderboard/track/${track}`),
  },

  // User profile
  user: {
    getProfile: () => api.get('/user/profile'),
    updateProfile: (data) => api.put('/user/profile', data),
    getStats: () => api.get('/user/stats'),
  },
};

export default api;