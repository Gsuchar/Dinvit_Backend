import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'guest';
  resetPasswordToken?: string;
  resetPasswordExpires?: number;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'guest'], default: 'guest' },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Number }
}, { timestamps: true });

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
