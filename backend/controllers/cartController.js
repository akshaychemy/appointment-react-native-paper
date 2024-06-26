import Cart from '../models/Cart.js';

export const getCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createCart = async (req, res) => {
    try {
        const { user, products } = req.body;
        const cart = new Cart({ user, products });
        await cart.save();
        res.status(201).json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { user, products } = req.body;
        await Cart.findByIdAndUpdate(req.params.id, { user, products });
        res.status(200).json({ message: 'Cart updated successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
