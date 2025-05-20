import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { User } from '../models/user.model.js';

const { JWT_SECRET } = process.env;
const COOKIE_NAME = 'authToken';
if (!JWT_SECRET) throw new Error('JWT_SECRET non défini');

const signToken = (user) =>
  jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { firstName, lastName, email, password } = req.body;
  if (await User.findOne({ email }))
    return res.status(409).json({ message: 'Email already used' });

  const user = new User({ firstName, lastName, email });
  await user.setPassword(password);
  await user.save();
  console.log('👤  Inscription de', email);

  res.status(201).json({ id: user._id });
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  /* normalise les champs ---------------------------------------------------------------- */
  const email    = (req.body.email    || '').toLowerCase().trim();
  const password = (req.body.password || '').trim();

  console.debug('🔑  Tentative login →', email);

  const user = await User.findOne({ email });
  if (!user) {
    console.debug('⛔  user introuvable');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (!(await user.isValidPassword(password))) {
    console.debug('⛔  mot de passe invalide');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken(user);
  console.log('✅  Connexion OK', email);

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }).json({
    id:        user._id,
    firstName: user.firstName,
    lastName:  user.lastName,
    role:      user.role,
  });
};


export const logout = (_req, res) => {
  res
    .clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .json({ message: 'Déconnecté avec succès' });
};

export const checkSession = (_req, res) => res.sendStatus(200);

export const me = async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  if (!user) return res.sendStatus(404);
  res.json(user);
};
