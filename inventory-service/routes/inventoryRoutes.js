const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");

// Get stock for a product
router.get("/:productId", async (req, res) => {
  try {
    const stock = await Inventory.findOne({ productId: req.params.productId });
    if (!stock) return res.status(404).json({ message: "No stock record found" });
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add stock record
router.post("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const stock = new Inventory({ productId, quantity });
    await stock.save();
    res.status(201).json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update stock
router.put("/:productId", async (req, res) => {
  try {
    const { quantity } = req.body;
    const stock = await Inventory.findOneAndUpdate(
      { productId: req.params.productId },
      { quantity },
      { new: true }
    );
    if (!stock) return res.status(404).json({ message: "Stock not found" });
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete stock record
router.delete("/:productId", async (req, res) => {
  try {
    const result = await Inventory.findOneAndDelete({ productId: req.params.productId });
    if (!result) return res.status(404).json({ message: "Stock not found" });
    res.json({ message: "Stock deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
