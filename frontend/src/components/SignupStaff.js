import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignupStaff = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Fetch users from the server when the component mounts
    useEffect(() => {
        fetchUsers();

        // Listen for window resize to adjust styles dynamically
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Function to fetch all users
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`);
            setUsers(response.data);
        } catch (err) {
            console.error("Error fetching users", err);
        }
    };

    // Handle form submission (Signup)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, {
                username,
                email,
                password,
            });
            alert('Signup successful');
            fetchUsers(); // Refresh the users list
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    // Handle user deletion
    const handleDelete = async (userId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`);
            alert('User deleted');
            fetchUsers(); // Refresh the users list after deletion
        } catch (err) {
            console.error("Error deleting user", err);
        }
    };

    // Dynamic styles for responsiveness
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            padding: '20px',
            backgroundColor: '#f4f4f4',
            flexDirection: windowWidth <= 600 ? 'column' : 'row', // Stack in column on small screens
        },
        formContainer: {
            width: '100%',
            maxWidth: '500px',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            margin: windowWidth <= 600 ? '0' : '20px',
        },
        header: {
            textAlign: 'center',
            marginBottom: '20px',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            fontWeight: 'bold',
            marginBottom: '5px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#45a049',
        },
        error: {
            color: 'red',
            fontSize: '14px',
            marginTop: '10px',
            textAlign: 'center',
        },
        userList: {
            listStyleType: 'none',
            padding: 0,
            marginTop: '20px',
            width: '100%',
        },
        userItem: {
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        userItemButton: {
            padding: '5px 10px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.header}>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Username:</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            style={styles.input} 
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            style={styles.input} 
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password:</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            style={styles.input} 
                        />
                    </div>
                    {error && <p style={styles.error}>{error}</p>}
                    <button 
                        type="submit" 
                        style={styles.button}
                        onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                    >
                        Signup
                    </button>
                </form>

                <h3 style={styles.header}>User List</h3>
                <ul style={styles.userList}>
                    {users.map((user) => (
                        <li key={user._id} style={styles.userItem}>
                            {user.username} - {user.email} 
                            <button 
                                onClick={() => handleDelete(user._id)} 
                                style={styles.userItemButton}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SignupStaff;
