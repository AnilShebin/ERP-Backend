import { Router } from 'express';
import { login } from '../../controllers/superAdmin/auth';
import validate from '../../middlewares/validate';
import { loginSchema } from '../../validations/auth';
const router: Router = Router();

router.post('/login', validate(loginSchema), login);

export default router;
