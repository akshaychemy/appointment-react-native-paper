import Payment from '../models/Payment.js'; // Assuming you have a Payment model defined

// Controller to handle creating a new payment
export const createPayment = async (req, res) => {
    try {
        const { amount, currency, method, status, orderId, transactionId } = req.body;

        // Create a new Payment instance
        const payment = new Payment({
            amount,
            currency,
            method,
            status,
            orderId,
            transactionId
        });

        // Save the payment record to the database
        await payment.save();

        // Respond with the created payment object
        res.status(201).json(payment);
    } catch (err) {
        // Handle errors
        res.status(400).json({ message: err.message });
    }
};

// Controller to handle updating a payment status (e.g., from pending to completed)
export const updatePaymentStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Update payment status by payment ID
        await Payment.findByIdAndUpdate(req.params.id, { status });

        // Respond with success message
        res.status(200).json({ message: 'Payment status updated successfully' });
    } catch (err) {
        // Handle errors
        res.status(400).json({ message: err.message });
    }
};

// Controller to handle webhook notifications for payment updates (e.g., from payment gateway)
export const handlePaymentWebhook = async (req, res) => {
    try {
        // Process payment webhook payload (assuming it contains necessary data)
        const { paymentId, status } = req.body;

        // Update payment status based on payment ID
        await Payment.findByIdAndUpdate(paymentId, { status });

        // Respond to webhook with success message
        res.status(200).json({ message: 'Payment webhook received and processed successfully' });
    } catch (err) {
        // Handle errors
        res.status(400).json({ message: err.message });
    }
};

// Controller to retrieve a specific payment by ID
export const getPaymentById = async (req, res) => {
    try {
        // Find payment by ID
        const payment = await Payment.findById(req.params.id);

        // Check if payment exists
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Respond with payment object
        res.status(200).json(payment);
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
};

// Controller to retrieve all payments
export const getAllPayments = async (req, res) => {
    try {
        // Retrieve all payments
        const payments = await Payment.find();

        // Respond with array of payment objects
        res.status(200).json(payments);
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
};

// Controller to delete a payment by ID
export const deletePayment = async (req, res) => {
    try {
        // Delete payment by ID
        await Payment.findByIdAndDelete(req.params.id);

        // Respond with success message
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (err) {
        // Handle errors
        res.status(400).json({ message: err.message });
    }
};
