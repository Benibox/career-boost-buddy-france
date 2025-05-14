import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './src/config/db.js';
import app from './src/app.js';

const PORT = process.env.PORT || 4000;

try {
  await connectDB();                       // ↳ tente la connexion cloud
  console.log('Reached app.listen, about to bind the port…');
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`),
  );
} catch (err) {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1);
}
