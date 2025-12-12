const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    address: String,
    phone: String
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }
    }
  ],
  total: Number,
  status: { type: String, default: 'pending' },
  createdAt: Date
});

module.exports = mongoose.model('Order', OrderSchema);
