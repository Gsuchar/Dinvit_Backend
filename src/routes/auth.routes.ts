import { Router } from 'express';
import { register, login, forgotPassword } from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validation.middleware';
import { registerSchema, loginSchema, forgotPasswordSchema } from '../dtos/auth.dto';

const router = Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/forgot-password', validateBody(forgotPasswordSchema), forgotPassword);

export default router;
