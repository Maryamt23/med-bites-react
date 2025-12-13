const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = async function handler(req, res) {
  try {
    await connectDB();
    const items = await MenuItem.find({});
    return res.status(200).json(items);
  } catch (err) {
    console.error("Menu fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch menu" });
  }
};
