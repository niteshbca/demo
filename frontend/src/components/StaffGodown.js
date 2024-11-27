import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StaffGodown() {
  const [godowns, setGodowns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from backend API using the environment variable
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/godowns`)
      .then(response => {
        setGodowns(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleClick = (godown) => {
    // Navigate to the GodownDetail component and pass the godown data
    navigate('/godown-detail', { state: { godown } });
  };

  return (
    <div style={styles.container}>
      {godowns.map((godown, index) => (
        <div key={index} style={styles.godownCard}>
          <h3 style={styles.cardTitle}>{godown.name}</h3>
          <p style={styles.cardDescription}>{godown.address}</p>
          <button onClick={() => handleClick(godown)} style={styles.button}>View Details</button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '30px',
    background: 'linear-gradient(to right, #6a11cb, #2575fc)', // Gradient background
  },
  godownCard: {
    width: '250px',
    padding: '20px',
    margin: '15px',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardTitle: {
    fontSize: '1.2rem',
    color: '#2c3e50',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  cardDescription: {
    color: '#7f8c8d',
    marginBottom: '20px',
    fontSize: '1rem',
  },
  button: {
    padding: '12px 18px',
    backgroundColor: '#f39c12',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
};

// Hover effect styles
const hoverStyles = {
  godownCard: {
    transform: 'scale(1.05)', // Card scaling on hover
    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.2)',
  },
  button: {
    backgroundColor: '#e67e22',
    transform: 'translateY(-3px)', // Slight button elevation on hover
  },
};

export default StaffGodown;
