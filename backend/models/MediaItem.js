import mongoose from 'mongoose';

const mediaItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Television Interviews', 'Newspaper Articles', 'Public Interviews', 'Film-Related News'],
      required: true,
    },
    headline: { type: String, required: true },
    source: { type: String, required: true },
    date: { type: String, default: '' },
    summary: { type: String, default: '' },
    externalUrl: { type: String, default: '' },
    thumbnailUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('MediaItem', mediaItemSchema);

