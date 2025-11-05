import { createContext, useContext, useState, useEffect } from 'react';

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
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock authentication - replace with actual API call
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
      if (userData && password === 'password123') {
        const token = 'mock-jwt-token-' + Date.now();
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        
        return { success: true, user: userData };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const signup = async (name, email, password) => {
    try {
      // Mock signup - replace with actual API call
      const userData = {
        id: Date.now(),
        email,
        name,
        role: 'participant', // Default role for new signups
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };

      const token = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true, user: userData };
    } catch (error) {
      throw new Error(error.message || 'Signup failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
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