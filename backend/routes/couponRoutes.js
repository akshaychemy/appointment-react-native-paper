import express from 'express';
import { getCoupons, getCouponById, createCoupon, updateCoupon, deleteCoupon } from '../controllers/couponController.js';

const router = express.Router();

// GET all coupons
router.get('/', getCoupons);

// GET coupon by ID
router.get('/:id', getCouponById);

// POST create a new coupon
router.post('/', createCoupon);

// PUT update coupon details
router.put('/:id', updateCoupon);

// DELETE a coupon
router.delete('/:id', deleteCoupon);

export default router;
