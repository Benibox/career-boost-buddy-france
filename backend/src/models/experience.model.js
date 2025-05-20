import { Schema, model, Types } from 'mongoose';

const experienceSchema = new Schema(
  {
    /* propriétaire ------------------------------------------------*/
    userId:     { type: Types.ObjectId, ref: 'users', required: true },

    /* contenu principal -------------------------------------------*/
    title:      { type: String, trim: true, maxlength: 200, required: true },
    company:    { type: String, trim: true, maxlength: 200 },          // optionnel
    shortDesc:  { type: String, trim: true, maxlength: 500, required: true },
    longDesc:   { type: String, trim: true, maxlength: 5000 },         // bouton « + »

    startDate:  { type: Date, required: true },
    endDate:    { type: Date, required: true },
    location:   { type: String, trim: true, maxlength: 200 },

    /* validation employeur ----------------------------------------*/
    validatedBy: { type: Types.ObjectId, ref: 'users' },  // rôle employer
    validatedAt: { type: Date },

    /* statut  -----------------------------------------------------*/
    status: {
      type: String,
      enum: ['draft', 'submitted', 'validated', 'rejected'],
      default: 'draft',
    },
  },
  { timestamps: true, versionKey: false }
);

export const Experience = model('experiences', experienceSchema);
