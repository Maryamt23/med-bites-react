import mongoose from "mongoose";
import Cart from "./models/Cart";

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function handler(req, res) {
  await connectDB();
  try {
    const { sessionId } = req.query;

    if (req.method === "GET") {
      const cart = await Cart.findOne({ sessionId });
      return res.status(200).json(cart ? cart.items : []);
    }

    if (req.method === "POST") {
      const items = req.body.items || [];
      const cart = await Cart.findOneAndUpdate(
        { sessionId },
        { items },
        { new: true, upsert: true }
      );
      return res.status(200).json(cart);
    }

    if (req.method === "DELETE") {
      await Cart.findOneAndDelete({ sessionId });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Cart error:", err);
    return res.status(500).json({ error: "Cart operation failed" });
  }
}
