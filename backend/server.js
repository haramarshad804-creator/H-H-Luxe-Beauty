
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

let orders = [];

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to H❤H Luxe Beauty Backend!");
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working successfully!"
  });
});

// Receive customer orders
app.post("/api/orders", (req, res) => {
  const { name, phone, city, address, products, total } = req.body;

  if (!name || !phone || !city || !address ||
      !products || !total) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required details."
    });
  }

  const newOrder = {
    id: Date.now(),
    name,
    phone,
    city,
    address,
    products,
    total,
    date: new Date()
  };

  orders.push(newOrder);

  res.status(201).json({
    success: true,
    message: "Order received successfully!",
    order: newOrder
  });
});

// View all orders
app.get("/api/orders", (req, res) => {
  res.json({
    success: true,
    orders: orders
  });
});

app.listen(PORT, () => {
  console.log("H❤H Luxe Beauty Backend Started!");
  console.log(`Server running at http://localhost:${PORT}`);
});
