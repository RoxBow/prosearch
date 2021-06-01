import mongoose from 'mongoose';
import validatePassword from '../utils/validatePassword';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide an username.'],
      maxlength: [20, 'Username cannot be more than 20 characters'],
      index: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email.'],
      maxlength: [20, 'Username cannot be more than 20 characters'],
      index: true,
      lowercase: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: false,
      maxlength: [30, "Owner's Name cannot be more than 60 characters"],
    },
    lastName: {
      type: String,
      required: false,
      maxlength: [30, "Owner's Name cannot be more than 60 characters"],
    },
    job: {
      type: String,
      required: false,
      enum: [null, 'DEV', 'DESIGN'],
      default: null,
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    hash: String,
    salt: String,
  },
  { timestamps: true }
);

UserSchema.methods.validPassword = password => validatePassword(this, password);

export default mongoose.models.User || mongoose.model('User', UserSchema);
