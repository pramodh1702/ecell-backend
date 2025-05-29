// Simple Express Backend for E-Cell Website

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model('Contact', ContactSchema);


app.get('/', (req, res) => {
  res.send('E-Cell Backend is running');
});

app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(Server running on port ${port});
})
