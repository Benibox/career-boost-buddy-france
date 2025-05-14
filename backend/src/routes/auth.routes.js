import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { registerRules, loginRules } from '../middleware/validators.js';

export const authRouter = Router();

authRouter.post('/register', registerRules, register);
authRouter.post('/login',    loginRules,    login);
