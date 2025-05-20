import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    email:     {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    passwordHash: { type: String, required: true },

    /* rôles élargis */
    role: {
      type: String,
      enum: ['candidate', 'employer', 'admin'],
      default: 'candidate',
    },
  },
  { timestamps: true, versionKey: false },
);

/* helpers -------------------------------------------------------- */
userSchema.methods.setPassword = async function (pwd) {
  this.passwordHash = await bcrypt.hash(pwd, 12);
};
userSchema.methods.isValidPassword = function (pwd) {
  return bcrypt.compare(pwd, this.passwordHash);
};

export const User = model('users', userSchema);
