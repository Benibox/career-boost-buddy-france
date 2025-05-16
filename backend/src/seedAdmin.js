import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from './models/user.model.js';

dotenv.config();              // charge .env
await mongoose.connect(process.env.MONGO_URI);

if (await User.countDocuments({ role: 'admin' })) {
  console.log('✔️  Admin déjà présent, skip seed');
  process.exit(0);
}

const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin123!', 12);

await User.create({
  firstName: 'Admin',
  lastName: 'Root',
  email: process.env.ADMIN_EMAIL || 'admin@demo.com',
  passwordHash: hash,
  role: 'admin',
});

console.log('✅  Compte admin seedé');
process.exit(0);
