 feature11
//Simple Express Backend for E-cell Website
// Simple Express Backend for E-Cell Website
==

// Simple Express Backend
>>> main

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');const helmet = require('helmet');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Contact Schema
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  message: { type: String, required: [true, 'Message is required'] }
});

const Contact = mongoose.model('Contact', ContactSchema);

// ================================
// 🚀 Simple Express Backend for E-Cell Website
// ================================

// 1. Import Required Packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();

// 2. Initialize Express App
const app = express();
const port = process.env.PORT || 5000;

// 3. Middleware Setup
app.use(cors());
app.use(helmet());
app.use(express.json());

// ================================
// 🌐 MongoDB Connection
// ================================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ================================
// 📁 Mongoose Schema & Model
// ================================

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: 5,
    maxlength: 1000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', ContactSchema);

// ================================
// 📌 Routes
// ================================

// Home Route
app.get('/', (req, res) => {
  res.send('🚀 E-Cell Backend is up and running!');
});

// Contact Route (POST)
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Input Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields (name, email, message) are required.'
    });
  }

  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({
      success: true,
      message: '✅ Message sent and stored successfully.'
    });
  } catch (err) {
    console.error('❌ Error saving contact message:', err.message);
    res.status(500).json({
      success: false,
      error: 'Server error while saving message.'
    });
  }
});

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).send('✅ Server is healthy');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: '❌ Route not found'
  });
});

// Global Error Handler (optional)
app.use((err, req, res, next) => {
  console.error('💥 Unexpected Error:', err);
  res.status(500).json({
    success: false,
    error: '❌ Internal Server Error'
  });
});

// ================================
// 🚦 Start Server
// ================================
app.listen(port, () => {
  console.log(`🌐 Server running on http://localhost:${port}`);
});

