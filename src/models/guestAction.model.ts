import mongoose, { Schema, Document } from 'mongoose';

export interface IGuestAction extends Document {
  _id: mongoose.Types.ObjectId;
  invitationId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  companions?: {
    count: number;
    names?: string[];
  };
  status: 'attending' | 'not_attending' | 'pending';
  notes?: string;
  suggestions?: string;
  musicSuggestion?: {
    artist: string;
    title: string;
    link?: string;
  };
  source: 'manual' | 'self';
  createdAt: Date;
  updatedAt: Date;
}

const GuestActionSchema: Schema = new Schema(
  {
    invitationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invitation',
      required: true
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    companions: {
      count: { type: Number, default: 0 },
      names: [{ type: String }]
    },
    status: {
      type: String,
      enum: ['attending', 'not_attending', 'pending'],
      default: 'pending'
    },
    notes: { type: String },
    suggestions: { type: String },
    musicSuggestion: {
      artist: { type: String },
      title: { type: String },
      link: { type: String }
    },
    source: {
      type: String,
      enum: ['manual', 'self'],
      default: 'self'
    }
  },
  { timestamps: true }
);

// Asegurar unicidad por invitación + email
GuestActionSchema.index({ invitationId: 1, email: 1 }, { unique: true });

export default mongoose.model<IGuestAction>('GuestAction', GuestActionSchema);
