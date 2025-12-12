const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true, unique: true },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);
