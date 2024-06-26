import Wishlist from '../models/Wishlist.js';

export const getWishlists = async (req, res) => {
    try {
        const wishlists = await Wishlist.find();
        res.status(200).json(wishlists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getWishlistById = async (req, res) => {
    try {
        const wishlist = await Wishlist.findById(req.params.id);
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }
        res.status(200).json(wishlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createWishlist = async (req, res) => {
    try {
        const { user, products } = req.body;
        const wishlist = new Wishlist({ user, products });
        await wishlist.save();
        res.status(201).json(wishlist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateWishlist = async (req, res) => {
    try {
        const { user, products } = req.body;
        await Wishlist.findByIdAndUpdate(req.params.id, { user, products });
        res.status(200).json({ message: 'Wishlist updated successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteWishlist = async (req, res) => {
    try {
        await Wishlist.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Wishlist deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
