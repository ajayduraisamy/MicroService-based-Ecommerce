const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: String,
      quantity: { type: Number, required: true, default: 1 }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "PENDING" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
