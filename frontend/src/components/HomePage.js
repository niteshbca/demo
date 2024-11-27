// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f8ff',
        textAlign: 'center',
      }}
    >
      <h1 
        style={{
          fontSize: '3rem',
          color: '#333',
          marginBottom: '20px',
        }}
      >
        Welcome to the Home Page
      </h1>
      <div>
        <button 
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '10px',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'background-color 0.3s ease',
          }}
        >
          <Link 
            to="/loginadmin"
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Login as Admin
          </Link>
        </button>

        <button 
          style={{
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '10px',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'background-color 0.3s ease',
          }}
        >
          <Link 
            to="/loginstaff"
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Login as Staff
          </Link>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
