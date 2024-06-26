import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const shippingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  rate: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Shipping = model('Shipping', shippingSchema);

export default Shipping;
