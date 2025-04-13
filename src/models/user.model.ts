import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  lastName: string;
  username?: string;
  email: string;
  phone: string;
  password: string;
  role: 'admin' | 'user';
  plan: 'basic' | 'pro' | 'premium';
  status: 'pending' | 'active' | 'banned' | 'inactive';
  authProvider: 'local' | 'google' | 'facebook';
  socialId?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    plan: {
      type: String,
      enum: ['basic', 'pro', 'premium'],
      default: 'basic'
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'banned', 'inactive'],
      default: 'pending'
    },
    authProvider: {
      type: String,
      enum: ['local', 'google', 'facebook'],
      default: 'local'
    },
    socialId: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Number }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
