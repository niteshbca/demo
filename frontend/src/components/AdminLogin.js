import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // useNavigate hook to navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use the API URL from the .env file
    const apiUrl = process.env.REACT_APP_BACKEND_URL;

    // API call to backend to check credentials
    try {
      const response = await axios.post(`${apiUrl}/loginadmin`, {
        username,
        password,
      });

      if (response.data.success) {
        navigate('/dashboard'); // Navigate to the dashboard on successful login
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('Error connecting to the server');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label htmlFor="username" style={styles.label}>Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
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
    backgroundColor: '#f4f7f6',
    padding: '20px',
  },
  header: {
    fontSize: '2rem',
    color: '#4b0082',
    marginBottom: '30px',
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  inputFocus: {
    borderColor: '#4CAF50',
    boxShadow: '0 0 8px rgba(76, 175, 80, 0.5)',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '1.2rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  error: {
    color: 'red',
    fontSize: '1rem',
    marginTop: '15px',
    textAlign: 'center',
  }
};

export default AdminLogin;
