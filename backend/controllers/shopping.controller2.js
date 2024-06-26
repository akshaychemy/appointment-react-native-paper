import Shipping from '../models/Shipping.js';
import upload from '../middleware/fileUpload.js';
import multer from 'multer';
import path from 'path';

export const getShippings = async (req, res) => {
    try {
        const shippings = await Shipping.find();
        res.status(200).json(shippings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getShippingById = async (req, res) => {
    try {
        const shipping = await Shipping.findById(req.params.id);
        if (!shipping) {
            return res.status(404).json({ message: 'Shipping not found' });
        }
        res.status(200).json(shipping);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createShipping = async (req, res) => {
    try {
        upload.single('file')(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'File upload error', error: err.message });
            } else if (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }

            const { name, address, city, postalCode, country } = req.body;

            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const imagePath = req.file.path;
            const filename = path.basename(imagePath);

            const shipping = new Shipping({ name, address, city, postalCode, country, file: filename });
            await shipping.save();
            res.status(201).json(shipping);
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateShipping = async (req, res) => {
    try {
        upload.single('file')(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'File upload error', error: err.message });
            } else if (err) {
                return res.status(500).json({ message: 'Internal server error', error: err.message });
            }

            const { name, address, city, postalCode, country } = req.body;
            let updateFields = { name, address, city, postalCode, country };

            if (req.file) {
                const imagePath = req.file.path;
                const filename = path.basename(imagePath);
                updateFields.file = filename;
            }

            const updatedShipping = await Shipping.findByIdAndUpdate(req.params.id, updateFields, { new: true });
            if (!updatedShipping) {
                return res.status(404).json({ message: 'Shipping not found' });
            }

            res.status(200).json(updatedShipping);
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteShipping = async (req, res) => {
    try {
        const shipping = await Shipping.findByIdAndDelete(req.params.id);
        if (!shipping) {
            return res.status(404).json({ message: 'Shipping not found' });
        }
        res.status(200).json({ message: 'Shipping deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
