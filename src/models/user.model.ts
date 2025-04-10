import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  plan: 'basic' | 'pro' | 'premium';
  invitations: mongoose.Types.ObjectId[];
  authProvider: 'local' | 'google' | 'facebook';
  socialId?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // opcional si login es por redes
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
    invitations: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invitation'
    }],
    authProvider: {
      type: String,
      enum: ['local', 'google', 'facebook'],
      default: 'local'
    },
    socialId: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Number },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);


/*import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'guest';
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'guest'], default: 'guest' }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);*/
