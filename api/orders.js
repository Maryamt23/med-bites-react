require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false }).then(m => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = async (req, res) => {
  await connectDB();

  if (req.method === 'POST') {
    const { customer, items, total, sessionId } = req.body;
    if (!items || !items.length) return res.status(400).json({ error: 'No items' });

    const order = new Order({
      customer: customer || {},
      items,
      total,
      status: 'pending',
      createdAt: new Date()
    });
    await order.save();

    if (sessionId) await Cart.findOneAndDelete({ sessionId });

    return res.status(201).json(order);
  }

  return res.status(405).json({ error: "Method not allowed" });
};
