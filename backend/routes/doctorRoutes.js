import express from 'express';

import { createDoctor,getDoctors } from '../controllers/doctorController.js';

const route = express.Router();

route.get('/',getDoctors)
route.post('/',createDoctor)

export default route;