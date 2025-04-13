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
  status: 'yes' | 'no' | 'pending';
  notes?: string;
  musicSuggestions?: {
    artist: string;
    title: string;
    link?: string;
  }[];
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
      enum: ['yes', 'no', 'pending'],
      default: 'pending'
    },
    notes: { type: String },
    musicSuggestions: [
      {
        artist: { type: String, required: true },
        title: { type: String, required: true },
        link: { type: String }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<IGuestAction>('GuestAction', GuestActionSchema);


/*
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
  status: 'yes' | 'no' | 'pending';
  notes?: string;
  musicSuggestions?: {
    artist: string;
    title: string;
    link?: string;
  }[];
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
      enum: ['yes', 'no', 'pending'],
      default: 'pending'
    },
    notes: { type: String },
    musicSuggestions: [
      {
        artist: { type: String, required: true },
        title: { type: String, required: true },
        link: { type: String }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<IGuestAction>('GuestAction', GuestActionSchema);

*/