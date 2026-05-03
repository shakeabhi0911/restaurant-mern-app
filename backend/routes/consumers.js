const express = require('express');
const router = express.Router();
const Consumer = require('../models/Consumer');

// POST /api/consumers → Register a new consumer
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Basic validation
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Check duplicate email
    const existing = await Consumer.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already registered.' });
    }

    const consumer = new Consumer({ name, email, phone });
    await consumer.save();

    res.status(201).json({ success: true, message: 'Consumer registered successfully!', data: consumer });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// GET /api/consumers → Fetch all consumers
router.get('/', async (req, res) => {
  try {
    const consumers = await Consumer.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: consumers.length, data: consumers });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
