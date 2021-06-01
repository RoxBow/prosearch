import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide an name.'],
      maxlength: [20, 'Name cannot be more than 20 characters'],
      realisations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Realisation' }],
      index: true,
      unique: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
