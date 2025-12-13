const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  sessionId: String,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
