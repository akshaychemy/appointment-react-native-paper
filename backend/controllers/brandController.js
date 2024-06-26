import Brand from '../models/Brand.js';
import upload from '../middleware/fileUpload.js'; // Assuming you have configured Multer for file uploads

import path from 'path';
import multer from 'multer';

export const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.status(200).json(brand);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createBrand = async (req, res) => {
    try {
        // Handle file upload using Multer
        upload.single('image')(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'File upload error', error: err.message });
            } else if (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }

            // Process other fields
            const { name, description } = req.body;

            // Check if file is uploaded
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            // Save brand with image path
            const imagePath = req.file.path;
            const filename = path.basename(imagePath)
            const brand = new Brand({ name, description, logo: filename });
            await brand.save();

            // Respond with the created brand
            res.status(201).json(brand);
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateBrand = async (req, res) => {
    try {
        // Destructure fields from request body
        const { name, description } = req.body;

        // Handle file upload using Multer if image is included in the request
        upload.single('image')(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'File upload error', error: err.message });
            } else if (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }

            // Prepare update object with provided fields
            let updateFields = { name, description };

            // If file is uploaded, update image field
            if (req.file) {
                const imagePath = req.file.path;
                const filename = path.basename(imagePath)
                updateFields.image = filename
            }

            // Perform the update operation
            await Brand.findByIdAndUpdate(req.params.id, updateFields);

            // Respond with success message
            res.status(200).json({ message: 'Brand updated successfully' });
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteBrand = async (req, res) => {
    try {
        await Brand.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Brand deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
