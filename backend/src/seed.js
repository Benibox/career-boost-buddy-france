/**
 *  backend/src/seed.js
 *  Exécute : npm run seed   (commande : node src/seed.js)
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt   from 'bcryptjs';
import { User } from './models/user.model.js';      // ← chemin corrigé

const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
if (!uri) {
  console.error('❌  MONGO_URI/MONGODB_URI manquant');
  process.exit(1);
}

console.log('🛢️  Connexion à', uri);
await mongoose.connect(uri);

/* Skip si un admin existe déjà */
if (await User.exists({ role: 'admin' })) {
  console.log('✔️  Admin déjà présent – seed ignoré');
  process.exit(0);
}

const email    = (process.env.ADMIN_EMAIL    || 'admin@demo.com').toLowerCase();
const password =  process.env.ADMIN_PASSWORD || 'Admin123!';
const hash     = await bcrypt.hash(password, 12);

await User.create({
  firstName: 'Admin',
  lastName : 'Root',
  email,
  passwordHash: hash,
  role: 'admin',
});

console.log(`
✅  Compte admin créé
   ✉︎  email   : ${email}
   🔑  password: ${password}
`);
process.exit(0);
