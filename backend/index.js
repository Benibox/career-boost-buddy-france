// index.js
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './src/config/db.js';
import app from './src/app.js';

// Définit le port (fallback à 4000)
const PORT = process.env.PORT || 4000;

// Affiche la chaîne de connexion pour s'assurer qu'elle est bien lue
console.log('➡️ MONGODB_URI =', process.env.MONGODB_URI);

try {
  // 1) Connexion à MongoDB
  await connectDB();
  console.log('✅ MongoDB connecté');

  // 2) Démarrage du serveur
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1);
}
