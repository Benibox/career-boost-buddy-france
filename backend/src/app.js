import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter }  from './routes/auth.routes.js';
import userRouter      from './routes/user.routes.js';
import experienceRouter from './routes/experience.routes.js';

/* ─────────────  LOG HTTP (optionnel) ─────────────
   Si le paquet morgan est présent, on l’utilise.
   Sinon on continue sans interrompre l’app.
--------------------------------------------------- */
let httpLogger = (_req, _res, next) => next();      // no-op par défaut
try {
  const { default: morgan } = await import('morgan');
  httpLogger = morgan('dev');
} catch {
  console.warn('ℹ️  morgan non installé : logs HTTP réduits');
}

const app = express();
app.use(httpLogger);

/* ───────────────  CORS ─────────────── */
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8081',
  'http://172.20.185.111:8081',
  'http://127.0.0.1:8080',
];

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  })
);

/* ───────────  MIDDLEWARE  ─────────── */
app.use(cookieParser());
app.use(express.json());

/* Trace le JSON reçu (debug) */
app.use((req, _res, next) => {
  if (Object.keys(req.body || {}).length) {
    console.debug('📦  Body:', req.method, req.originalUrl, req.body);
  }
  next();
});

/* ───────────────  ROUTES  ─────────────── */
app.use('/api/auth',  authRouter);
app.use('/api/users', userRouter);
app.use('/api', experienceRouter);   

export default app;
