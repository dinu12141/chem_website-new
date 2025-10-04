import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminRoute = ({ children }) => {
  // Check if user is admin (using sessionStorage for better security)
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
  
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
