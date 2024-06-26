import Order from '../models/Order.js';

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { user, products, status, totalPrice } = req.body;
        const order = new Order({ user, products, status, totalPrice });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { user, products, status, totalPrice } = req.body;
        await Order.findByIdAndUpdate(req.params.id, { user, products, status, totalPrice });
        res.status(200).json({ message: 'Order updated successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
