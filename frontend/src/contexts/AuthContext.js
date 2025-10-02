import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Set axios default header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
          const response = await axios.get(`${API}/auth/me`);
          setUser(response.data);
          setToken(savedToken);
        } catch (error) {
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (registerNumber, password) => {
    try {
      const response = await axios.post(`${API}/auth/login`, {
        register_number: registerNumber,
        password: password
      });

      const { access_token, user: userData } = response.data;
      
      localStorage.setItem('token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      setToken(access_token);
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API}/auth/register`, userData);
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error) {
      console.error('Registration error:', error);
      // Provide more detailed error messages
      if (error.response) {
        // Server responded with error status
        if (error.response.data && error.response.data.detail) {
          // Check for specific error messages
          const detail = error.response.data.detail;
          if (detail.includes('registered')) {
            return { 
              success: false, 
              error: detail 
            };
          }
          return { 
            success: false, 
            error: detail 
          };
        } else {
          return { 
            success: false, 
            error: `Registration failed: ${error.response.status} ${error.response.statusText}` 
          };
        }
      } else if (error.request) {
        // Request was made but no response received
        // This is likely a network error or server not running
        return { 
          success: false, 
          error: 'Unable to connect to the server. Please make sure the server is running and try again.' 
        };
      } else {
        // Something else happened
        return { 
          success: false, 
          error: 'Registration failed. Please try again.' 
        };
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};