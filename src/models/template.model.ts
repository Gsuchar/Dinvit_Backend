import mongoose, { Schema, Document } from 'mongoose';

export interface ITemplate extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  category: 'wedding' | 'communion' | 'birthday' | 'corporate' | 'other';
  version: string;
  previewImage?: string;
  theme: {
    colors: Record<string, string>;
    fonts: Record<string, string>;
    images: Record<string, string>;
  };
  availableFields: {
    dressCode: boolean;
    locationMap: boolean;
    musicSuggestion: boolean;
    rsvpNotes: boolean;
    giftSuggestion: boolean;
    notes: boolean;
    gallery: boolean;
  };
  isPremium: boolean;
  isActive: boolean;
  tags?: string[];
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TemplateSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ['wedding', 'communion', 'birthday', 'corporate', 'other'],
      required: true
    },
    version: { type: String, required: true },
    previewImage: { type: String },
    theme: {
      colors: {
        type: Map,
        of: String,
        default: {}
      },
      fonts: {
        type: Map,
        of: String,
        default: {}
      },
      images: {
        type: Map,
        of: String,
        default: {}
      }
    },
    availableFields: {
      dressCode: { type: Boolean, default: true },
      locationMap: { type: Boolean, default: true },
      musicSuggestion: { type: Boolean, default: true },
      rsvpNotes: { type: Boolean, default: true },
      giftSuggestion: { type: Boolean, default: true },
      notes: { type: Boolean, default: true },
      gallery: { type: Boolean, default: true }
    },
    isPremium: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    tags: [{ type: String }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

export default mongoose.model<ITemplate>('Template', TemplateSchema);
