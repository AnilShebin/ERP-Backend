import { Router } from 'express';
import authRoutes from './auth';
import staffRoutes from './staff';
import clientRoutes from './client';

const router = Router();

// Unified authentication route
router.use(authRoutes); 
router.use('/staff', staffRoutes);
router.use('/clients', clientRoutes);

export default router;
