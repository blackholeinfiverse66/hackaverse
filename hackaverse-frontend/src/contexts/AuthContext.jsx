/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from '../constants/appConstants';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userData = localStorage.getItem(USER_DATA_KEY);
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiService.auth.login({ email, password });
      const { token, user } = response.data;
      
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
      
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true, user };
    } catch (error) {
      // If API request failed due to network/server or mock is allowed, fall back to local mock users
      const shouldUseMock = !error.response || import.meta.env.VITE_USE_MOCK_API !== 'false';
      if (shouldUseMock) {
        const mockUsers = {
          'admin@hackaverse.com': { 
            id: 1, 
            email: 'admin@hackaverse.com', 
            name: 'Admin User', 
            role: 'admin',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
          },
          'participant@hackaverse.com': { 
            id: 2, 
            email: 'participant@hackaverse.com', 
            name: 'John Participant', 
            role: 'participant',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=participant'
          },
          'judge@hackaverse.com': { 
            id: 3, 
            email: 'judge@hackaverse.com', 
            name: 'Judge Smith', 
            role: 'judge',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=judge'
          }
        };

        const userData = mockUsers[email];
        if (userData && password) {
          const token = 'mock-jwt-token-' + Date.now();
          
          localStorage.setItem(AUTH_TOKEN_KEY, token);
          localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
          
          setUser(userData);
          setIsAuthenticated(true);
          
          return { success: true, user: userData };
        }
      }
      throw new Error(error.response?.data?.detail || error.message || 'Login failed');
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await apiService.auth.register({ name, email, password });
      const { token, user } = response.data;
      
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
      
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true, user };
    } catch (error) {
      // If API request failed due to network/server or mock is allowed, fall back to a mock signup
      const shouldUseMock = !error.response || import.meta.env.VITE_USE_MOCK_API !== 'false';
      if (shouldUseMock) {
        const userData = {
          id: Date.now(),
          email,
          name,
          role: 'participant',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        };

        const token = 'mock-jwt-token-' + Date.now();
        
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        
        return { success: true, user: userData };
      }
      throw new Error(error.response?.data?.detail || error.message || 'Signup failed');
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    setUser(null);
    setIsAuthenticated(false);
    // Navigate to home page after logout
    window.location.href = '/';
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Note: use named exports to keep the module shape predictable.