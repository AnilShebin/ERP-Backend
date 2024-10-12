import { Router } from 'express';
import authRoutes from './auth';
const router = Router();

// Unified authentication route
router.use('/auth', authRoutes);

export default router;
