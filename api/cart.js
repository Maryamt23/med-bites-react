require('dotenv').config();
const mongoose = require('mongoose');
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

  const { sessionId } = req.query;

  if (req.method === 'GET') {
    const cart = await Cart.findOne({ sessionId });
    return res.status(200).json(cart ? cart.items : []);
  }

  if (req.method === 'POST') {
    const { items } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { sessionId },
      { items },
      { new: true, upsert: true }
    );
    return res.status(200).json(cart);
  }

  return res.status(405).json({ error: "Method not allowed" });
};
