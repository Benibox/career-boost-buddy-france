import { Router } from 'express';
import {
  listByUser,
  getExp,
  createExp,
  updateExp,
  deleteExp,
  validateExp,
} from '../controllers/experience.controller.js';
import {
  requireAuth,
  requireEmployer,
} from '../middleware/auth.middleware.js';
import {
  validateRequest,
  createExpSchema,
  updateExpSchema,
} from '../middleware/validators.js';

const router = Router();

/* ---------- alias “me” ------------------------------------------------ */
router.get ('/users/me/experiences',       requireAuth,
  (req, res, next) => listByUser({ ...req, params: { uid: req.user.id } }, res, next));
router.post('/users/me/experiences',       requireAuth, validateRequest(createExpSchema),
  (req, res, next) => createExp({ ...req, params: { uid: req.user.id } }, res, next));

/* ---------- par utilisateur ------------------------------------------- */
router.get ('/users/:uid/experiences',     requireAuth, listByUser);
router.post('/users/:uid/experiences',     requireAuth, validateRequest(createExpSchema), createExp);

/* ---------- par ID d’expérience --------------------------------------- */
router.get   ('/experiences/:id',          requireAuth, getExp);                       // ← NEW
router.put   ('/experiences/:id',          requireAuth, validateRequest(updateExpSchema), updateExp);
router.delete('/experiences/:id',          requireAuth, deleteExp);
router.post  ('/experiences/:id/validate', requireAuth, requireEmployer, validateExp);

export default router;
