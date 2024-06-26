import express from 'express';
import { getAllPayments, getPaymentById, createPayment, updatePaymentStatus, deletePayment } from '../controllers/paymentController.js';

const router = express.Router();

// GET all payments
router.get('/', getAllPayments);

// GET payment by ID
router.get('/:id', getPaymentById);

// POST create a new payment
router.post('/', createPayment);

// PUT update payment details
router.put('/:id', updatePaymentStatus);

// DELETE a payment
router.delete('/:id', deletePayment);

export default router;
