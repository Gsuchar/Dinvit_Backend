import mongoose, { Schema, Document } from 'mongoose';

export interface IToken extends Document {
  _id: mongoose.Types.ObjectId;
  token: string;
  invitationId: mongoose.Types.ObjectId;
  type: 'access' | 'edit' | 'rsvp' | 'view';
  expiresAt: Date;
  used?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TokenSchema: Schema = new Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true
    },
    invitationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invitation',
      required: true
    },
    type: {
      type: String,
      enum: ['access', 'edit', 'rsvp', 'view'],
      default: 'access'
    },
    expiresAt: {
      type: Date,
      required: true
    },
    used: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model<IToken>('Token', TokenSchema);
