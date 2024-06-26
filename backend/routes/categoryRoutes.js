import express from 'express';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';

const router = express.Router();

// GET all categories
router.get('/', getCategories);

// GET category by ID
router.get('/:id', getCategoryById);

// POST create a new category
router.post('/', createCategory);

// PUT update category details
router.put('/:id', updateCategory);

// DELETE a category
router.delete('/:id', deleteCategory);

export default router;
