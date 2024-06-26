import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  logo: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Brand = model('Brand', brandSchema);

export default Brand;
