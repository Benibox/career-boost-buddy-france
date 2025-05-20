import { body, validationResult } from 'express-validator';

/* wrapper générique --------------------------------------------- */
export const validateRequest = (rules) => [
  ...rules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

/* auth ----------------------------------------------------------- */
export const registerRules = [
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
];
export const loginRules = [
  body('email').isEmail(),
  body('password').notEmpty(),
];

/* CRUD user ------------------------------------------------------ */
const roleEnum = ['candidate', 'employer', 'admin'];

export const createUserSchema = [
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').optional().isIn(roleEnum),
];

export const updateUserSchema = [
  body('firstName').optional().notEmpty(),
  body('lastName').optional().notEmpty(),
  body('email').optional().isEmail(),
  body('password').optional().isLength({ min: 6 }),
  body('role').optional().isIn(roleEnum),
];
