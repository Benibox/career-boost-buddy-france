import jwt from 'jsonwebtoken';

const COOKIE_NAME = 'authToken';

/* Auth obligatoire ------------------------------------------------ */
export const requireAuth = (req, res, next) => {
  let token = null;

  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) token = header.split(' ')[1];
  if (!token && req.cookies?.[COOKIE_NAME]) token = req.cookies[COOKIE_NAME];

  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (err) {
    console.warn('🔒  JWT invalide', err.message);
    res.sendStatus(401);
  }
};

/* Admin seulement ------------------------------------------------- */
export const requireAdmin = (req, _res, next) => {
  if (req.user?.role === 'admin') return next();
  return _res.sendStatus(403);
};
