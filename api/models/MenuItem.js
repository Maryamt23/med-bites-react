const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  image: String
});

module.exports =
  mongoose.models.MenuItem ||
  mongoose.model("MenuItem", MenuItemSchema);
