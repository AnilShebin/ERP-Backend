import { Router } from 'express';
import authRoutes from './auth';
import staffRoutes from './staff';

const router = Router();

// Unified authentication route
router.use(authRoutes); 
router.use('/staff', staffRoutes);

export default router;
