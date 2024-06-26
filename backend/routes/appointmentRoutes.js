import express from 'express';

import { getAppointments,bookAppointment } from '../controllers/appointmentController.js';

const route = express.Router();

route.get('/',getAppointments)
route.post('/',bookAppointment)

export default route;