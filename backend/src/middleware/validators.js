import { body } from 'express-validator';

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
