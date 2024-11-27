// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';  // For navigation

const Ldashboard = () => {
  const navigate = useNavigate();

  const handleQRCreate = () => {
    // Navigate to QR Creator page (or handle QR generation logic)
    console.log('Navigating to QR Creator...');
    navigate('/qr-creator');
  };

  const handleGodown = () => {
    // Navigate to Godown page (or handle godown logic)
    console.log('Navigating to Godown...');
    navigate('/sgodown');
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f8ff',
      }}
    >
      <h2>Welcome to the Dashboard</h2>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handleQRCreate}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px 20px',
            width: '200px',
            marginBottom: '10px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
          }}
        >
          QR Creator
        </button>
      </div>
      <div>
        <button
          onClick={handleGodown}
          style={{
            backgroundColor: '#17a2b8',
            color: 'white',
            padding: '10px 20px',
            width: '200px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
          }}
        >
          Godown
        </button>
      </div>
    </div>
  );
};

export default Ldashboard;
