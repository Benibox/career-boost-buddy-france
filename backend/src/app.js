import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.routes.js';

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:8080"
  ],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRouter);

export default app;



