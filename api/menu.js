// /api/menu.js
import mongoose from "mongoose";
import MenuItem from "../server/models/MenuItem";

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
    if (req.method === "GET") {
      const items = await MenuItem.find({});
      res.status(200).json(items);
    } else if (req.method === "POST") {
      const { name, description, price, category, image } = req.body;
      const item = new MenuItem({ name, description, price, category, image });
      await item.save();
      res.status(201).json(item);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.error("Menu API error:", err);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
}
