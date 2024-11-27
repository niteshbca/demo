// src/components/Inventory.js
import React from 'react';

const Inventory = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Inventory Page</h2>
      <p>Welcome to the Inventory page. Here you can manage all the products in your inventory.</p>
      {/* Add additional content or features here */}
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
    marginBottom: '20px',
  },
};

export default Inventory;
