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

const isoDate = (field) =>
  body(field).isISO8601().toDate().withMessage(`${field} doit être une date ISO`);

export const createExpSchema = [
  body('title').notEmpty().isLength({ max: 200 }),
  body('shortDesc').notEmpty().isLength({ max: 500 }),
  isoDate('startDate'),
  isoDate('endDate'),
  body('location').notEmpty().isLength({ max: 200 }),
];

export const updateExpSchema = [
  body('title').optional().isLength({ max: 200 }),
  body('shortDesc').optional().isLength({ max: 500 }),
  body('longDesc').optional().isLength({ max: 5000 }),
  isoDate('startDate').optional(),
  isoDate('endDate').optional(),
  body('location').optional().isLength({ max: 200 }),
  body('status').optional().isIn(['draft', 'submitted', 'validated', 'rejected']),
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
