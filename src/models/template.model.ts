import mongoose, { Schema, Document } from 'mongoose';

export interface ITemplate extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  type: 'wedding' | 'communion' | 'birthday' | 'corporate' | 'other';
  version: number;
  theme: {
    colors: Record<string, string>;
    fonts: Record<string, string>;
    images?: Record<string, string>;
  };
  availableFields: {
    dressCode: boolean;
    locationMap: boolean;
    musicSuggestion: boolean;
    rsvpNotes: boolean;
    gallery: boolean;
    tips: boolean;
  };
  isPremium: boolean;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TemplateSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      enum: ['wedding', 'communion', 'birthday', 'corporate', 'other'],
      default: 'other'
    },
    version: { type: Number, default: 1 },
    theme: {
      colors: {
        type: Map,
        of: String,
        required: true
      },
      fonts: {
        type: Map,
        of: String,
        required: true
      },
      images: {
        type: Map,
        of: String
      }
    },
    availableFields: {
      dressCode: { type: Boolean, default: true },
      locationMap: { type: Boolean, default: true },
      musicSuggestion: { type: Boolean, default: true },
      rsvpNotes: { type: Boolean, default: true },
      gallery: { type: Boolean, default: true },
      tips: { type: Boolean, default: true }
    },
    isPremium: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    }
  },
  { timestamps: true }
);

export default mongoose.model<ITemplate>('Template', TemplateSchema);
