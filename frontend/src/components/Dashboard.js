import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Dashboard</h2>
      <div style={styles.buttonContainer}>
        <Link to="/inventory" style={styles.link}>
          <button style={styles.button}>Inventory</button>
        </Link>
        <Link to="/signupstaff" style={styles.link}>
          <button style={styles.button}>Staff</button>
        </Link>
        <Link to="/godown" style={styles.link}>
          <button style={styles.button}>Godown</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f9fb',
    padding: '20px',
  },
  header: {
    fontSize: '2.5rem',
    color: '#4b0082',
    marginBottom: '30px',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1.1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  buttonHover: {
    backgroundColor: '#45a049',
    transform: 'scale(1.05)',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

export default Dashboard;
