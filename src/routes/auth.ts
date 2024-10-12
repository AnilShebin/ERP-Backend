import { Router } from 'express';
import { login, register } from '../controllers/auth';
import validate from '../middlewares/validate';
import { loginSchema, registerSchema } from '../validations/auth';
import { protect, authorize } from '../middlewares/auth-middleware';

const router: Router = Router();

// Login route (common for both)
router.post('/login', validate(loginSchema), login);

// Register route with role-based protection
router.post('/register', validate(registerSchema), register);


// router.post('/register', protect, authorize(['SUPER_ADMIN', 'ADMIN']), validate(registerSchema), register);


export default router;
