import express from 'express';
import { createShippingMethod, getAllShippingMethods, getShippingMethodById, updateShippingMethod, deleteShippingMethod } from '../controllers/shippingController.js';

const router = express.Router();

router.get('/', getAllShippingMethods);
router.get('/:id', getShippingMethodById);
router.post('/', createShippingMethod);
router.put('/:id', updateShippingMethod);
router.delete('/:id', deleteShippingMethod);

export default router;
