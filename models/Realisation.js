import mongoose from 'mongoose';

const RealisationSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: false,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  },
  { timestamps: true }
);

export default mongoose.models.Realisation || mongoose.model('Realisation', RealisationSchema);
