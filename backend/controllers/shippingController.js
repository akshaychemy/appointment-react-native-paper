import Shipping from '../models/Shipping.js'; // Assuming you have a Shipping model defined

// Controller to create a new shipping method
export const createShippingMethod = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Create a new Shipping instance
        const shippingMethod = new Shipping({
            name,
            description,
            price
        });

        // Save the shipping method record to the database
        await shippingMethod.save();

        // Respond with the created shipping method object
        res.status(201).json(shippingMethod);
    } catch (err) {
        // Handle errors
        res.status(400).json({ message: err.message });
    }
};

// Controller to update an existing shipping method
export const updateShippingMethod = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Update shipping method by shipping method ID
        await Shipping.findByIdAndUpdate(req.params.id, { name, description, price });

        // Respond with success message
        res.status(200).json({ message: 'Shipping method updated successfully' });
    } catch (err) {
        // Handle errors
        res.status(400).json({ message: err.message });
    }
};

// Controller to retrieve a specific shipping method by ID
export const getShippingMethodById = async (req, res) => {
    try {
        // Find shipping method by ID
        const shippingMethod = await Shipping.findById(req.params.id);

        // Check if shipping method exists
        if (!shippingMethod) {
            return res.status(404).json({ message: 'Shipping method not found' });
        }

        // Respond with shipping method object
        res.status(200).json(shippingMethod);
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
};

// Controller to retrieve all shipping methods
export const getAllShippingMethods = async (req, res) => {
    try {
        // Retrieve all shipping methods
        const shippingMethods = await Shipping.find();

        // Respond with array of shipping method objects
        res.status(200).json(shippingMethods);
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
};

// Controller to delete a shipping method by ID
export const deleteShippingMethod = async (req, res) => {
    try {
        // Delete shipping method by ID
        await Shipping.findByIdAndDelete(req.params.id);

        // Respond with success message
        res.status(200).json({ message: 'Shipping method deleted successfully' });
    } catch (err) {
        // Handle errors
        res.status(400).json({ message: err.message });
    }
};
