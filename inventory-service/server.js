const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const inventoryRoutes = require("./routes/inventoryRoutes");
app.use("/inventory", inventoryRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Inventory Service DB Connected"))
  .catch(err => console.error("DB Error:", err));

// Start server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Inventory Service running on port ${PORT}`);
});
