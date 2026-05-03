const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Serve static files from /public ─────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/consumers', require('./routes/consumers'));
app.use('/api/menu', require('./routes/menu'));

// ─── MongoDB Connection ───────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/restaurantDB';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(' MongoDB connected successfully'))
  .catch((err) => console.error(' MongoDB connection error:', err));

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
