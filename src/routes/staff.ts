import { Router } from 'express';
import { addStaff, getStaff, updateStaff, deleteStaff, listAllStaff } from '../controllers/staff';
import validate from '../middlewares/validate';
// import { staffSchema } from '../validations/staff';
import { protect, authorize } from '../middlewares/auth-middleware';

const router = Router();

router.post('/',  addStaff);
router.get('/:staffId', getStaff); 
router.put('/:staffId',  updateStaff); 
router.delete('/:staffId', deleteStaff); 
router.get('/', listAllStaff);

export default router;
