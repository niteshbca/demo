// Import required modules
require('dotenv').config(); // This loads the .env file
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize express
const app = express();
const PORT = process.env.PORT || 5000; // Use the PORT from the .env file or default to 5000

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// ** Godown Schema and Model **
const godownSchema = new mongoose.Schema({
  name: String,
  address: String,
}, { collection: 'godowns' });

const Godown = mongoose.model('Godown', godownSchema);

// ** User Schema (for authentication) **
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// ** Todo Item Schema and Model **
const itemSchema = new mongoose.Schema({
  text: String
});

const Item = mongoose.model('Item', itemSchema);

// ** Godown API Routes **

app.get('/api/godowns', async (req, res) => {
  try {
    const godowns = await Godown.find();
    res.json(godowns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/godowns', async (req, res) => {
  const { name, address } = req.body;
  const godown = new Godown({ name, address });

  try {
    const savedGodown = await godown.save();
    res.json(savedGodown);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/godowns/:id', async (req, res) => {
  try {
    const godown = await Godown.findByIdAndDelete(req.params.id);
    if (!godown) {
      return res.status(404).json({ message: 'Godown not found' });
    }
    res.json({ message: 'Godown deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ** Todo API Routes **

app.post('/add', async (req, res) => {
  const newItem = new Item({ text: req.body.text });
  try {
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(500).send({ error: 'Failed to add item' });
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete item' });
  }
});

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch items' });
  }
});

// ** User API Routes (Signup, Login, User List, Delete) **

app.post('/api/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Admin Login route (for admin login)
app.post('/loginadmin', (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true });
  }

  return res.json({ success: false });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
