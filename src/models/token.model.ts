import mongoose, { Schema, Document } from 'mongoose';

export interface IToken extends Document {
  _id: mongoose.Types.ObjectId;
  token: string;
  type: 'access' | 'edit' | 'rsvp' | 'view' | 'recovery' | 'auth';
  invitationId?: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  expiresAt: Date;
  used?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TokenSchema: Schema = new Schema(
  {
    token: { type: String, required: true },
    type: {
      type: String,
      enum: ['access', 'edit', 'rsvp', 'view', 'recovery', 'auth'],
      required: true
    },
    invitationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invitation',
      required: false
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model<IToken>('Token', TokenSchema);
