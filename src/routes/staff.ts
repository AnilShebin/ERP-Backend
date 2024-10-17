import { Router } from 'express';
import { addStaff, getStaff, updateStaff, deleteStaff, listAllStaff } from '../controllers/staff';
import validate from '../middlewares/validate';
// import { staffSchema } from '../validations/staff';
import { protect, authorize } from '../middlewares/auth-middleware';

const router = Router();

// Use a more descriptive parameter name for clarity
// router.post('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), validate(staffSchema), addStaff);
// router.get('/:staffId', protect, authorize('ADMIN', 'SUPER_ADMIN'), getStaff); // Updated parameter name
// router.put('/:staffId', protect, authorize('ADMIN', 'SUPER_ADMIN'), validate(staffSchema), updateStaff); // Updated parameter name
// router.delete('/:staffId', protect, authorize('SUPER_ADMIN'), deleteStaff); // Updated parameter name
// router.get('/', protect, authorize('ADMIN', 'SUPER_ADMIN'), listAllStaff);

router.post('/',  addStaff);
router.get('/:staffId', getStaff); // Updated parameter name
router.put('/:staffId',  updateStaff); // Updated parameter name
router.delete('/:staffId', deleteStaff); // Updated parameter name
router.get('/', listAllStaff);

export default router;
