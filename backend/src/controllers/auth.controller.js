// backend/src/controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { User } from '../models/user.model.js';

// Vérifie que le secret est bien lu !
console.log("JWT_SECRET =", process.env.JWT_SECRET);

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'authToken';

// Génère un JWT
const signToken = (userId) =>
  jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '7d' });

// ... (reste du fichier inchangé)


export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { firstName, lastName, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already used' });

  const user = new User({ firstName, lastName, email });
  await user.setPassword(password);
  await user.save();

  res.status(201).json({ id: user._id });
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await user.isValidPassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user.id);

  res
    .cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    })
    .status(200)
    .json({ message: 'Connecté avec succès' });
};

// Déconnexion : supprime le cookie
export const logout = (req, res) => {
  res
    .clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .json({ message: 'Déconnecté avec succès' });
};

// Vérification de session : route protégée par ensureAuth
export const checkSession = (req, res) => {
  res.sendStatus(200);
};
