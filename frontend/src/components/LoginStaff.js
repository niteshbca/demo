import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const LoginStaff = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false); // State for hover effect
  const navigate = useNavigate(); // Hook to navigate to different routes

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Axios POST request to login API
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        email,
        password
      });

      // On successful login
      setMessage('Login successful!');
      console.log('JWT Token:', response.data.token);
      
      // Store the token in localStorage (optional)
      localStorage.setItem('token', response.data.token);

      // Redirect to the dashboard or any other page after successful login
      navigate('/ldashboard'); // Adjust the route accordingly
    } catch (error) {
      // Handle error response
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background:'#f0f8ff',
      fontFamily: 'Arial, sans-serif',
      padding: '10px',
      margin: '0',
    },
    form: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      transition: 'all 0.3s ease',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '15px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px',
      transition: 'border-color 0.3s ease',
    },
    inputFocus: {
      borderColor: '#6e7bff',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: isHovered ? '#9c7bff' : '#6e7bff', // Apply hover effect inline
      border: 'none',
      borderRadius: '5px',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      transform: isHovered ? 'scale(1.05)' : 'none', // Button scale on hover
    },
    message: {
      color: 'red',
      textAlign: 'center',
      marginTop: '10px',
      fontSize: '14px',
    },
    successMessage: {
      color: 'green',
      textAlign: 'center',
      marginTop: '10px',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.container}>
      <form
        style={styles.form}
        onSubmit={handleSubmit}
        onFocus={(e) => e.target.style.borderColor = '#6e7bff'}
        onBlur={(e) => e.target.style.borderColor = '#ddd'}
      >
        <h2 style={styles.heading}>Login</h2>
        {message && (
          <p style={message.includes('successful') ? styles.successMessage : styles.message}>
            {message}
          </p>
        )}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
          onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginStaff;
