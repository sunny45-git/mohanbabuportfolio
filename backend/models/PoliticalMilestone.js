import mongoose from 'mongoose';

const politicalMilestoneSchema = new mongoose.Schema(
  {
    year: { type: String, required: true },
    party: { type: String, required: true },
    constituency: { type: String, default: 'Andole' },
    outcome: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('PoliticalMilestone', politicalMilestoneSchema);

