// Test admin login function
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const testAdminLogin = async () => {
  try {
    console.log('Testing admin login...');
    console.log('API URL:', `${API}/auth/admin/login`);
    
    const response = await fetch(`${API}/auth/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'nadeeka2025'
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()]);
    
    const data = await response.json();
    console.log('Response data:', data);
    
    return { success: response.ok, data, status: response.status };
  } catch (error) {
    console.error('Test login error:', error);
    return { success: false, error: error.message };
  }
};