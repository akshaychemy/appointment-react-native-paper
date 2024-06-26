import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

// GET all products
router.get('/', getProducts);

// GET product by ID
router.get('/:id', getProductById);

// POST create a new product
router.post('/', createProduct);

// PUT update product details
router.put('/:id', updateProduct);

// DELETE a product
router.delete('/:id', deleteProduct);

export default router;
