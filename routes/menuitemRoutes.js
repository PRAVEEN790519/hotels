const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuitem');

/* ======================
   POST - Add new menu item
====================== */
router.post('/', async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const response = await newItem.save();
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* ======================
   GET - Get all menu items
====================== */
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* ======================
   GET - Menu items by taste
   sweet / spicy
====================== */
router.get('/:taste', async (req, res) => {
  try {
    const taste = req.params.taste;

    if (!['sweet', 'spicy'].includes(taste)) {
      return res.status(400).json({ error: 'Invalid taste type' });
    }

    const items = await MenuItem.find({ taste: taste });
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* ======================
   PUT - Update menu item by ID
====================== */
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* ======================
   DELETE - Delete menu item by ID
====================== */
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.status(200).json({
      message: 'Menu item deleted successfully',
      deletedItem
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
