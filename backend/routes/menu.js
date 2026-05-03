const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// POST /api/menu → Add a new menu item
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || price === undefined) {
      return res.status(400).json({ success: false, message: 'Name, description, and price are required.' });
    }

    const item = new MenuItem({ name, description, price, category });
    await item.save();

    res.status(201).json({ success: true, message: 'Menu item added successfully!', data: item });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// GET /api/menu → Fetch all menu items (with optional price filter)
router.get('/', async (req, res) => {
  try {
    const { maxPrice, minPrice } = req.query;
    let filter = {};

    if (minPrice !== undefined && maxPrice !== undefined) {
      filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    } else if (maxPrice !== undefined) {
      filter.price = { $lte: Number(maxPrice) };
    } else if (minPrice !== undefined) {
      filter.price = { $gte: Number(minPrice) };
    }

    const items = await MenuItem.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Seed default items if none exist
router.post('/seed', async (req, res) => {
  try {
    const count = await MenuItem.countDocuments();
    if (count > 0) {
      return res.status(200).json({ message: 'Menu already has items, skipping seed.' });
    }
    const defaultItems = [
      { name: 'Broccoli Pie', description: 'A green pie with an earthy crust', price: 199.99, category: 'Main Course' },
      { name: 'Eggplant Smoothie', description: 'A purple shake with an earthy quake', price: 99.99, category: 'Beverages' },
      { name: 'Watermelon Sushi', description: 'A red roll with atmospheric sweetness', price: 499.99, category: 'Starters' },
      { name: 'Garden Salad', description: 'Fresh seasonal vegetables with lemon dressing', price: 149.99, category: 'Salads' },
      { name: 'Mushroom Risotto', description: 'Creamy arborio rice with wild mushrooms', price: 349.99, category: 'Main Course' },
      { name: 'Berry Blast Smoothie', description: 'Mixed berries blended with almond milk', price: 149.99, category: 'Beverages' },
    ];
    await MenuItem.insertMany(defaultItems);
    res.status(201).json({ success: true, message: 'Menu seeded successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Seed error', error: err.message });
  }
});

module.exports = router;
