import Review from '../models/Review.js'; // Assuming you have a Review model defined

// Controller to create a new review
export const createReview = async (req, res) => {
    try {
        const { productId, userId, rating, comment } = req.body;

        // Create a new Review instance
        const review = new Review({
            productId,
            userId,
            rating,
            comment
        });

        // Save the review record to the database
        await review.save();

        // Respond with the created review object
        res.status(201).json(review);
    } catch (err) {
        // Handle errors
        res.status(400).json({ message: err.message });
    }
};

// Controller to update an existing review
export const updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        // Update review by review ID
        await Review.findByIdAndUpdate(req.params.id, { rating, comment });

        // Respond with success message
        res.status(200).json({ message: 'Review updated successfully' });
    } catch (err) {
        // Handle errors
        res.status(400).json({ message: err.message });
    }
};

// Controller to retrieve a specific review by ID
export const getReviewById = async (req, res) => {
    try {
        // Find review by ID
        const review = await Review.findById(req.params.id);

        // Check if review exists
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Respond with review object
        res.status(200).json(review);
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
};

// Controller to retrieve all reviews for a product
export const getReviewsByProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        // Find all reviews for the specified product
        const reviews = await Review.find({ productId });

        // Respond with array of review objects
        res.status(200).json(reviews);
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
};

// Controller to delete a review by ID
export const deleteReview = async (req, res) => {
    try {
        // Delete review by ID
        await Review.findByIdAndDelete(req.params.id);

        // Respond with success message
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        // Handle errors
        res.status(400).json({ message: err.message });
    }
};
