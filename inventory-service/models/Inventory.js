const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model("Inventory", InventorySchema);
