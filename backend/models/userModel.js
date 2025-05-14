import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  setPassword(password: string): Promise<void>;
  isValidPassword(password: string): Promise<boolean>;
}

/* ---------- Schéma ---------- */
const userSchema = new Schema<IUser>(
  {
    firstName:  { type: String, required: true, trim: true },
    lastName:   { type: String, required: true, trim: true },
    email:      {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

/* ---------- Méthodes d’instance ---------- */
userSchema.methods.setPassword = async function (password: string) {
  this.passwordHash = await bcrypt.hash(password, 12);           // 12 rounds ≈ 100 ms
};

userSchema.methods.isValidPassword = function (password: string) {
  return bcrypt.compare(password, this.passwordHash);
};

/* ---------- Exposition ---------- */
export const UserModel = model<IUser>('users', userSchema);
