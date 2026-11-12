import mongoose from 'mongoose';

const awardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    year: { type: String, required: true },
    organization: { type: String, required: true },
    film: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Award', awardSchema);

