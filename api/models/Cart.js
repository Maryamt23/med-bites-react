import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ]
});

export default mongoose.models.Cart ||
  mongoose.model("Cart", CartSchema);
