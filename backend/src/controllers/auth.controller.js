import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { validationResult } from 'express-validator';
import { User } from '../models/user.model.js';
import { sendMail } from '../utils/mailer.js';

const { JWT_SECRET } = process.env;
const COOKIE_NAME = 'authToken';
if (!JWT_SECRET) throw new Error('JWT_SECRET non défini');

/** Génère un JWT standard */
const signToken = (user) =>
  jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

/** POST /api/auth/register */
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { firstName, lastName, email, password } = req.body;
  if (await User.findOne({ email }))
    return res.status(409).json({ message: 'Email already used' });

  const user = new User({ firstName, lastName, email });
  await user.setPassword(password);

  // token de confirmation
  const token = crypto.randomBytes(32).toString('hex');
  user.confirmationToken = token;
  user.confirmationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24h
  await user.save();

  // envoi de l'email
  await sendMail('verification', email, { firstName, token });

  console.log('👤  Inscription de', email);
  res.status(201).json({ id: user._id });
};

/** GET /api/auth/confirm/:token */
export const confirmEmail = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({
    confirmationToken: token,
    confirmationTokenExpires: { $gt: Date.now() },
  });
  if (!user) return res.status(400).send('Lien invalide ou expiré');

  user.isConfirmed = true;
  user.confirmationToken = undefined;
  user.confirmationTokenExpires = undefined;
  await user.save();

  // côté front on peut afficher une page de succès
  return res.redirect(`${process.env.FRONTEND_URL}/login?confirmed=1`);
};

/** POST /api/auth/login */
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const email = (req.body.email || '').toLowerCase().trim();
  const password = (req.body.password || '').trim();

  console.debug('🔑  Tentative login →', email);
  const user = await User.findOne({ email });
  if (!user || !(await user.isValidPassword(password))) {
    console.debug('⛔  credentials invalides');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (!user.isConfirmed) {
    return res.status(403).json({ message: 'Veuillez confirmer votre e-mail' });
  }

  const token = signToken(user);
  console.log('✅  Connexion OK', email);

  return res
    .cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });
};

/** POST /api/auth/logout */
export const logout = (_req, res) => {
  res
    .clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .json({ message: 'Déconnecté avec succès' });
};

/** GET /api/auth/check */
export const checkSession = (_req, res) => res.sendStatus(200);

/** GET /api/auth/me */
export const me = async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  if (!user) return res.sendStatus(404);
  res.json(user);
};
