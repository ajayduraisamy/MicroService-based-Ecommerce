const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
const orderRoutes = require("./routes/order.routes");
app.use("/orders", orderRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Order Service DB Connected"))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
