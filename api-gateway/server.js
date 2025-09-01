const express = require('express');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');
const authMiddleware = require('./middleware/auth');

dotenv.config();
const app = express();

app.use(express.json());

// Routes
const gatewayRoutes = require('./routes/gatewayRoutes');
app.use('/api', authMiddleware, gatewayRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
