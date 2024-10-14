import { Router } from 'express';
import { login } from '../controllers/auth';
import validate from '../middlewares/validate';
import { loginSchema } from '../validations/auth';

const router: Router = Router();

// Login route (common for both)
router.post('/login', validate(loginSchema), login);


export default router;
