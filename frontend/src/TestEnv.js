import React from 'react';

const TestEnv = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h2>Environment Variables Test</h2>
      <p>REACT_APP_BACKEND_URL: {process.env.REACT_APP_BACKEND_URL}</p>
      <p>REACT_APP_API_URL: {process.env.REACT_APP_API_URL}</p>
      <p>Window location origin: {window.location.origin}</p>
    </div>
  );
};

export default TestEnv;