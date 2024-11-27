import React, { useState, useEffect } from 'react';

const Godown = () => {
  const [godowns, setGodowns] = useState([]);
  const [newGodown, setNewGodown] = useState({ name: '', address: '' });

  // Fetch Godowns from the database when the component mounts
  useEffect(() => {
    fetchGodowns();
  }, []);

  // Fetch Godowns from the backend API
  const fetchGodowns = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/godowns`);
      const data = await response.json();
      setGodowns(data);
    } catch (error) {
      console.error('Error fetching godowns:', error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGodown({ ...newGodown, [name]: value });
  };

  // Handle Add Godown (save to database)
  const handleAddGodown = async () => {
    if (newGodown.name && newGodown.address) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/godowns`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newGodown),
        });

        const data = await response.json();
        setGodowns([...godowns, data]);  // Update state with the new godown
        setNewGodown({ name: '', address: '' });  // Clear the input fields
        console.log("Godown added to database", data);
      } catch (error) {
        console.error('Error adding godown:', error);
      }
    }
  };

  // Handle Remove Godown (delete from database)
  const handleRemoveGodown = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/godowns/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setGodowns(godowns.filter(godown => godown._id !== id)); // Remove the deleted godown from the state
        console.log("Godown removed from database");
      }
    } catch (error) {
      console.error('Error deleting godown:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Godown Page</h2>
      <p>Welcome to the Godown page. Here you can manage the storage facilities and the goods within.</p>

      {/* Input Form */}
      <div style={styles.formContainer}>
        <input
          type="text"
          name="name"
          value={newGodown.name}
          onChange={handleInputChange}
          placeholder="Enter Godown Name"
          style={styles.input}
        />
        <input
          type="text"
          name="address"
          value={newGodown.address}
          onChange={handleInputChange}
          placeholder="Enter Godown Address"
          style={styles.input}
        />
        <button onClick={handleAddGodown} style={styles.addButton}>Add Godown</button>
      </div>

      {/* List of Godowns */}
      <div style={styles.godownList}>
        {godowns.length === 0 ? (
          <p>No Godowns available</p>
        ) : (
          godowns.map((godown) => (
            <div key={godown._id} style={styles.godownItem}>
              <p><strong>Name:</strong> {godown.name}</p>
              <p><strong>Address:</strong> {godown.address}</p>
              <button onClick={() => handleRemoveGodown(godown._id)} style={styles.removeButton}>Remove Godown</button>
            </div>
          ))
        )}
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
    marginBottom: '20px',
  },
  formContainer: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    margin: '5px',
    width: '200px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  addButton: {
    padding: '10px 15px',
    backgroundColor: '#4b0082',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  godownList: {
    width: '100%',
    maxWidth: '600px',
    marginTop: '20px',
    textAlign: 'left',
  },
  godownItem: {
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#e8e8e8',
    borderRadius: '6px',
  },
  removeButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Godown;
