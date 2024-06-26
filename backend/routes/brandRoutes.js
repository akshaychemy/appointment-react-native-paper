import express from 'express';
import { getBrands, getBrandById, createBrand, updateBrand, deleteBrand } from '../controllers/brandController.js';

const router = express.Router();

// GET all brands
router.get('/', getBrands);

// GET brand by ID
router.get('/:id', getBrandById);

// POST create a new brand
router.post('/', createBrand);

// PUT update brand details
router.put('/:id', updateBrand);

// DELETE a brand
router.delete('/:id', deleteBrand);

export default router;
