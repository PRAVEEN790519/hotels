const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: [
      'starter',
      'veg-main',
      'nonveg-main',
      'rice',
      'bread',
      'beverage',
      'dessert'
    ],
    required: true
  },
  isVeg: {
    type: Boolean,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
