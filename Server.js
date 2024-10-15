// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let cart = [];

// Add an item to the cart
app.post('/cart', (req, res) => {
  const { id, title, price, quantity } = req.body;
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id, title, price, quantity });
  }

  res.json(cart);
});

// Get cart items
app.get('/cart', (req, res) => {
  res.json(cart);
});

// Update cart item quantity
app.put('/cart/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const item = cart.find(item => item.id === id);

  if (item) {
    item.quantity = quantity;
  }

  res.json(cart);
});

// Remove item from the cart
app.delete('/cart/:id', (req, res) => {
  const { id } = req.params;
  cart = cart.filter(item => item.id !== id);
  res.json(cart);
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
