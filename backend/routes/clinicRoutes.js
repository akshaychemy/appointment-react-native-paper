import express from 'express';

import { createClinic,getClinics } from '../controllers/clinicController.js';

const route = express.Router();

route.get('/',getClinics)
route.post('/',createClinic)

export default route;