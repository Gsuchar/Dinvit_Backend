import mongoose, { Schema, Document } from 'mongoose';

export interface IInvitation extends Document {
  event: mongoose.Types.ObjectId;
  title: string;
  honoree: string;
  date: Date;
  time: string;
  location: string;
  dressCode?: string;
  agenda?: string;
  uniqueLink: string;
  music?: string;
  images?: string[];
  language: 'es' | 'en' | 'pt';
  rsvp?: {
    name: string;
    email: string;
    guests: number;
    allergies?: string;
    suggestions?: string;
  };
}

const InvitationSchema: Schema = new Schema({
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  title: { type: String, required: true },
  honoree: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  dressCode: { type: String },
  agenda: { type: String },
  uniqueLink: { type: String, required: true, unique: true },
  music: { type: String },
  images: [{ type: String }],
  language: { type: String, enum: ['es', 'en', 'pt'], default: 'es' },
  rsvp: {
    name: { type: String },
    email: { type: String },
    guests: { type: Number },
    allergies: { type: String },
    suggestions: { type: String }
  }
}, { timestamps: true });

export default mongoose.model<IInvitation>('Invitation', InvitationSchema);
