//Simple Express Backend for E-cell Website
// Simple Express Backend for E-Cell Website

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
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

// Routes
app.get('/', (req, res) => {
  res.send('🚀 E-Cell Backend is running');
});

app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields (name, email, message) are required'
      });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: '✅ Message sent successfully' });
  } catch (err) {
    console.error('Error saving contact message:', err.message);
    res.status(500).json({ success: false, error: '❌ Server error' });
  }
});

// Health check route
app.get('/health', (req, res) => res.status(200).send('OK'));

app.listen(port, () => {
  console.log(`🌐 Server running on port ${port}`);
});

