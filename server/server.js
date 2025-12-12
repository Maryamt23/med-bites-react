require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Models
const MenuItem = require('./models/MenuItem');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

/* ----- MENU routes ----- */
// List all menu items
app.get('/api/menu', async (req, res) => {
  const items = await MenuItem.find({});
  res.json(items);
});

// Get one
app.get('/api/menu/:id', async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// Create (admin)
app.post('/api/menu', async (req, res) => {
  const { name, description, price, category, image } = req.body;
  const item = new MenuItem({ name, description, price, category, image });
  await item.save();
  res.status(201).json(item);
});

// Update
app.put('/api/menu/:id', async (req, res) => {
  const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
app.delete('/api/menu/:id', async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

/* ----- CART routes (session-based key) ----- */
// Get cart for sessionId
app.get('/api/cart/:sessionId', async (req, res) => {
  const sessionId = req.params.sessionId;
  const cart = await Cart.findOne({ sessionId });
  res.json(cart ? cart.items : []);
});

// Save/update cart for sessionId
app.post('/api/cart/:sessionId', async (req, res) => {
  const sessionId = req.params.sessionId;
  const items = req.body.items || [];
  const cart = await Cart.findOneAndUpdate(
    { sessionId },
    { items },
    { new: true, upsert: true }
  );
  res.json(cart);
});

// Clear cart
app.delete('/api/cart/:sessionId', async (req, res) => {
  const sessionId = req.params.sessionId;
  await Cart.findOneAndDelete({ sessionId });
  res.json({ ok: true });
});

/* ----- ORDERS ----- */
app.post('/api/orders', async (req, res) => {
  const { customer, items, total, sessionId } = req.body;
  // Basic validation
  if (!items || !items.length) return res.status(400).json({ error: 'No items' });

  const order = new Order({
    customer: customer || {},
    items,
    total,
    status: 'pending',
    createdAt: new Date()
  });
  await order.save();

  // Optionally clear cart for sessionId
  if (sessionId) {
    await Cart.findOneAndDelete({ sessionId });
  }

  res.status(201).json(order);
});

app.get('/api/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Not found' });
  res.json(order);
});

/* Health */
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log('Server listening on port', PORT));
