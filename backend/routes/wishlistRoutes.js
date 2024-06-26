import express from 'express';
import { getWishlists, getWishlistById, createWishlist, updateWishlist, deleteWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

// GET all wishlists
router.get('/', getWishlists);

// GET wishlist by ID
router.get('/:id', getWishlistById);

// POST create a new wishlist
router.post('/', createWishlist);

// PUT update wishlist details
router.put('/:id', updateWishlist);

// DELETE a wishlist
router.delete('/:id', deleteWishlist);

export default router;
