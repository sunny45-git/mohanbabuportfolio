import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    decade: {
      type: String,
      enum: ['1990-1999', '2000-2009', '2010-2019', '2020-onwards'],
      required: true,
    },
    language: { type: String, default: 'Telugu' },
    role: { type: String, default: 'Character credit pending archival verification' },
    verifiedCharacter: { type: Boolean, default: false },
    description: { type: String, default: '' },
    posterUrl: { type: String, default: '' },
    cloudinaryPublicId: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Movie', movieSchema);

