import Coupon from '../models/Coupon.js';

export const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getCouponById = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        res.status(200).json(coupon);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createCoupon = async (req, res) => {
    try {
        const { code, discountPercentage, validUntil } = req.body;
        const coupon = new Coupon({ code, discountPercentage, validUntil });
        await coupon.save();
        res.status(201).json(coupon);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCoupon = async (req, res) => {
    try {
        const { code, discountPercentage, validUntil } = req.body;
        await Coupon.findByIdAndUpdate(req.params.id, { code, discountPercentage, validUntil });
        res.status(200).json({ message: 'Coupon updated successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteCoupon = async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Coupon deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
