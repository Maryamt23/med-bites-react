const mongoose = require("mongoose");
const path = require("path");
const Order = require(path.join(process.cwd(), "server", "models", "Order"));

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = async function handler(req, res) {
  try {
    await connectDB();
    const { sessionId, items, total } = req.body;
    const order = await Order.create({ sessionId, items, total });
    res.status(200).json(order);
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ error: "Order failed" });
  }
};
