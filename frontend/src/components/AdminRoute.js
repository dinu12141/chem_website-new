import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const validateAdminToken = async () => {
      const adminToken = sessionStorage.getItem('adminToken');
      
      if (!adminToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API}/auth/admin/me`, {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
          },
        });

        if (response.ok) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Admin token validation failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    validateAdminToken();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">Loading...</div>;
  }

  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;