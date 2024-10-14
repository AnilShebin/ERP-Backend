import { Router } from 'express';
import { addStaff, getStaff, updateStaff, deleteStaff, listAllStaff } from '../controllers/staff';
import validate from '../middlewares/validate';
import { staffSchema } from '../validations/staff';
import { protect, authorize } from '../middlewares/auth-middleware';

const router = Router();

router.post('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), validate(staffSchema), addStaff);
router.get('/:id', protect, authorize('ADMIN', 'SUPER_ADMIN'), getStaff);
router.put('/:id', protect, authorize('ADMIN', 'SUPER_ADMIN'), validate(staffSchema), updateStaff);
router.delete('/:id', protect, authorize('SUPER_ADMIN'), deleteStaff);
router.get('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), listAllStaff);

export default router;
