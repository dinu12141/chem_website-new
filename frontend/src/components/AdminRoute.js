import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // Check if user is admin (in a real app, this would be more sophisticated)
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;