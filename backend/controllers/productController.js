import Product from '../models/Product.js';
import upload from '../middleware/fileUpload.js';

import path from 'path';
import multer from 'multer';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        upload.array('images')(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                res.status(400).json({ "message": 'File upload error', error: err.message });
            } else if (err) {
                res.status(500).json({ "message": 'Internal server error', error: err.message });
            }

            const { name, description, price, category, brand, SKU, stockLevel } = req.body;
            const images = req.files.map(file => path.basename(file.path));

            // const imagePath = req.file.path;
            // const filename = path.basename(imagePath)

            const product = new Product({ name, description, price, category, brand, SKU, stockLevel, images });
            await product.save();
            res.status(201).json(product);
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const updateProduct = async (req, res) => {
    try {
        // Destructure fields from request body
        const { name, description, price, category, brand, SKU, stockLevel } = req.body;
        
        // Prepare update object with provided fields
        let updateFields = { name, description, price, category, brand, SKU, stockLevel };

        // Handle image upload if images are included in the request
        upload.array('images')(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'File upload error', error: err.message });
            } else if (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }

            // If files are uploaded successfully, update images field in updateFields
            if (req.files && req.files.length > 0) {
                updateFields.images = req.files.map(file => file.path);
            }

            try {
                // Perform the update operation
                await Product.findByIdAndUpdate(req.params.id, updateFields);

                // Respond with success message
                res.status(200).json({ message: 'Product updated successfully' });
            } catch (err) {
                // Handle any database update errors
                res.status(500).json({ message: 'Failed to update product', error: err.message });
            }
        });

    } catch (err) {
        // Handle any other unexpected errors
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
