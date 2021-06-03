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

RealisationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document.id;
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});

RealisationSchema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.id = document.id;
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});

export default mongoose.models.Realisation || mongoose.model('Realisation', RealisationSchema);
