import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth.routes.js';

const app = express();

/* ─────────────  CORS  ─────────────
   Autorise localhost:5173, localhost:8081
   et l’IP interne utilisée dans ton réseau.
   Ajoute/retire des domaines si besoin.
*/
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8081',
  'http://172.20.185.111:8081',
];

app.use(
  cors({
    origin(origin, cb) {
      // autorise aussi les requêtes sans origin (ex. curl, tests)
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);

export default app;
