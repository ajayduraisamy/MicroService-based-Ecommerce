const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategories,
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const { verifyToken, isAdmin } = require('../middleware/auth');

// Category routes
router.post('/category', verifyToken, isAdmin, createCategory); // Admin only
router.get('/category', getCategories); // Public

// Product routes
router.post('/product', verifyToken, isAdmin, createProduct); // Admin only
router.get('/product', getProducts); // Public
router.put('/product/:id', verifyToken, isAdmin, updateProduct); // Admin only
router.delete('/product/:id', verifyToken, isAdmin, deleteProduct); // Admin only

module.exports = router;
