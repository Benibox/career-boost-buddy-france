import { Router } from 'express';
import {
  register,
  login,
  logout,
  checkSession,
  me,
  confirmEmail,
} from '../controllers/auth.controller.js';
import { registerRules, loginRules } from '../middleware/validators.js';
import { requireAuth } from '../middleware/auth.middleware.js';


export const authRouter = Router();
authRouter.post('/register', registerRules, register);
authRouter.get('/confirm/:token', confirmEmail);
authRouter.post('/login', loginRules, login);
authRouter.post('/logout', logout);
authRouter.get('/check', requireAuth, checkSession);
authRouter.get('/me', requireAuth, me);

