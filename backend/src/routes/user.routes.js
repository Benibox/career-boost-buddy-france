import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware.js';
import { validateRequest, createUserSchema, updateUserSchema } from '../middleware/validators.js';

const router = Router();

/* Liste complète (admin) */
router.get('/',         requireAuth, requireAdmin, getUsers);

/* Détail par id */
router.get('/:id',      requireAuth,                  getUserById);

/* Création (admin) */
router.post('/',        requireAuth, requireAdmin, validateRequest(createUserSchema), createUser);

/* Modification (self ou admin selon ta logique — ici, seulement auth) */
router.put('/:id',      requireAuth, validateRequest(updateUserSchema), updateUser);

/* Suppression (admin) */
router.delete('/:id',   requireAuth, requireAdmin, deleteUser);

export default router;
