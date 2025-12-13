// /api/orders.js
import mongoose from "mongoose";
import Order from "../server/models/Order";
import Cart from "../server/models/Cart";

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function handler(req, res) {
  await connectDB();

  try {
    if (req.method === "POST") {
      const { customer, items, total, sessionId } = req.body;

      if (!items || !items.length) return res.status(400).json({ error: "No items" });

      const order = new Order({
        customer: customer || {},
        items,
        total,
        status: "pending",
        createdAt: new Date(),
      });
      await order.save();

      if (sessionId) await Cart.findOneAndDelete({ sessionId });

      res.status(201).json(order);
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.error("Orders API error:", err);
    res.status(500).json({ error: "Order failed" });
  }
}
