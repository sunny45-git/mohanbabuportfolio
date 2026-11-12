import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['Cinema', 'Politics', 'Events', 'Interviews'],
      required: true,
    },
    title: { type: String, required: true },
    caption: { type: String, default: '' },
    year: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    cloudinaryPublicId: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('GalleryItem', galleryItemSchema);

