import express from 'express';
import {
    //  getReviews, 
     getReviewById, createReview, updateReview, deleteReview } from '../controllers/reviewController.js';

const router = express.Router();

// GET all reviews
// router.get('/', getReviews);

// GET review by ID
router.get('/:id', getReviewById);

// POST create a new review
router.post('/', createReview);

// PUT update review details
router.put('/:id', updateReview);

// DELETE a review
router.delete('/:id', deleteReview);

export default router;
