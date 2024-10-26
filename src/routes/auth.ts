// src/routes/auth.ts
import { Router } from 'express';
import { login, register, getAllRegisteredCompanies, } from '../controllers/auth';
import validate from '../middlewares/validate';
import { loginSchema, registerSchema } from '../validations/auth'; // Assuming you have defined schemas
import { protect, authorize } from '../middlewares/auth-middleware';

const router: Router = Router();

// Login route
router.post('/login', validate(loginSchema), login);

// Register route
router.post('/register', validate(registerSchema), register);

// Get all registered users route
router.get('/registered-companies', protect, authorize('ADMIN', 'SUPER_ADMIN'), getAllRegisteredCompanies);

export default router;