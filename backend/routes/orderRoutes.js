import express from 'express';
import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

// GET all orders
router.get('/', getOrders);

// GET order by ID
router.get('/:id', getOrderById);

// POST create a new order
router.post('/', createOrder);

// PUT update order details
router.put('/:id', updateOrder);

// DELETE an order
router.delete('/:id', deleteOrder);

export default router;
