const express = require("express");
const router = express.Router();
const axios = require("axios");
const Order = require("../models/order.model");

// Create new order
router.post("/", async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Fetch product details to calculate price
    let totalPrice = 0;
    for (let item of products) {
      const response = await axios.get(
        `${process.env.PRODUCT_SERVICE_URL}/products/${item.productId}`
      );
      const product = response.data;
      totalPrice += product.price * item.quantity;

      // Reduce stock in inventory
      await axios.put(
        `${process.env.INVENTORY_SERVICE_URL}/inventory/${item.productId}`,
        { quantity: -item.quantity }
      );
    }

    const order = new Order({ userId, products, totalPrice });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Get order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
