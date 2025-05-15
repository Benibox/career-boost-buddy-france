// Charge immédiatement les variables d’environnement (.env)
// ───────────────────────────────────────────────────────────
import 'dotenv/config';

import { connectDB } from './src/config/db.js';
import app from './src/app.js';

// Vérifie la présence de la clé secrète
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET manquant dans .env');
  process.exit(1);
}

const PORT = process.env.PORT || 4000;

console.log('➡️ MONGODB_URI =', process.env.MONGODB_URI);

try {
  await connectDB();
  console.log('✅ MongoDB connecté');

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  });
} catch (err) {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1);
}
