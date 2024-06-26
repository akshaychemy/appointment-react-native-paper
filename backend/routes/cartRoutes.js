import express from 'express';
import { getCarts, getCartById, createCart, updateCart, deleteCart } from '../controllers/cartController.js';

const router = express.Router();

// GET all carts
router.get('/', getCarts);

// GET cart by ID
router.get('/:id', getCartById);

// POST create a new cart
router.post('/', createCart);

// PUT update cart details
router.put('/:id', updateCart);

// DELETE a cart
router.delete('/:id', deleteCart);

export default router;
