import express from 'express';

import { registerUser,login } from '../controllers/authController.js';

const route = express.Router();

// route.post('/register-superuser',)
route.post('/register',registerUser)
route.post('/login',login)

export default route;