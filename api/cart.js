// /api/cart.js
import mongoose from "mongoose";
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

  const { sessionId } = req.query;

  try {
    if (req.method === "GET") {
      const cart = await Cart.findOne({ sessionId });
      res.status(200).json(cart ? cart.items : []);
    } else if (req.method === "POST") {
      const items = req.body.items || [];
      const cart = await Cart.findOneAndUpdate(
        { sessionId },
        { items },
        { new: true, upsert: true }
      );
      res.status(200).json(cart);
    } else if (req.method === "DELETE") {
      await Cart.findOneAndDelete({ sessionId });
      res.status(200).json({ ok: true });
    } else {
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.error("Cart API error:", err);
    res.status(500).json({ error: "Cart operation failed" });
  }
}
