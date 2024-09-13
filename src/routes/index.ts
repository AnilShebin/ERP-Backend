import { Router } from 'express';
import superAdminRoutes from './superAdmin/index';
const router = Router();

router.use('/super-admin', superAdminRoutes);

export default router;
