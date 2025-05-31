import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  favorites?: (mongoose.Types.ObjectId | string)[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Optional: define the static model type
interface IUserModel extends Model<IUser> {}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profilePic: {
    type: String,
    default: ''
  },
   favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }]
});

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// ✅ Correctly typed model
const User = mongoose.models.User as IUserModel || mongoose.model<IUser, IUserModel>('User', userSchema);
export default User;
