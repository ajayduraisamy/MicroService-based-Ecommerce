const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require("./routes/product.routes");
app.use("/products", productRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Product Service DB Connected"))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});
