import mongoose, { Schema, Document } from 'mongoose';

export interface IInvitation extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  templateId: mongoose.Types.ObjectId;
  uniqueLink: string;
  title: string;
  honoree: string;
  welcomeText?: string;
  date: Date;
  time: string;
  location: {
    name: string;
    address: string;
    city: string;
    country: string;
    location?: string; // Coordenadas o string para Google Maps
  };
  dressCode?: string;
  language: 'es' | 'en' | 'pt';
  music?: string;
  active: {
    gallery: boolean;
    countDown: boolean;
    musicSuggestion: boolean;
    giftSuggestion: boolean;
    notes: boolean;
    dressCode: boolean;
    social: boolean;
  };
  notesText?: string;
  images: string[];
  expiresAt: Date;
  status?: 'active' | 'expired' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const InvitationSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: true
    },
    uniqueLink: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    honoree: { type: String, required: true },
    welcomeText: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      location: { type: String }
    },
    dressCode: { type: String },
    language: {
      type: String,
      enum: ['es', 'en', 'pt'],
      default: 'es'
    },
    music: { type: String },
    active: {
      gallery: { type: Boolean, default: true },
      countDown: { type: Boolean, default: true },
      musicSuggestion: { type: Boolean, default: true },
      giftSuggestion: { type: Boolean, default: true },
      notes: { type: Boolean, default: true },
      dressCode: { type: Boolean, default: true },
      social: { type: Boolean, default: true }
    },
    notesText: { type: String, default: '' },
    images: [{ type: String }],
    expiresAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ['active', 'expired', 'archived'],
      default: 'active'
    }
  },
  { timestamps: true }
);

// Índices recomendados para optimización de consultas
InvitationSchema.index({ userId: 1 });
InvitationSchema.index({ uniqueLink: 1 });

export default mongoose.model<IInvitation>('Invitation', InvitationSchema);
















/*
import mongoose, { Schema, Document } from 'mongoose';

export interface IInvitation extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  templateId: mongoose.Types.ObjectId;
  uniqueLink: string;
  title: string;
  honoree: string;
  welcomeText?: string;
  date: Date;
  time: string;
  location: {
    name: string;
    address: string;
    city: string;
    country: string;
    location?: string; // Coordenadas o string para Google Maps
  };
  dressCode?: string;
  language: 'es' | 'en' | 'pt';
  music?: string;
  active: {
    gallery: boolean;
    countDown: boolean;
    musicSuggestion: boolean;
    giftSuggestion: boolean;
    notes: boolean;
    dressCode: boolean;
    social: boolean;
  };
  notesText?: string;
  images: string[];
  expiresAt: Date;
  status?: 'active' | 'expired' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const InvitationSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: true
    },
    uniqueLink: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    honoree: { type: String, required: true },
    welcomeText: { type: String },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      location: { type: String }
    },
    dressCode: { type: String },
    language: {
      type: String,
      enum: ['es', 'en', 'pt'],
      default: 'es'
    },
    music: { type: String },
    active: {
      gallery: { type: Boolean, default: true },
      countDown: { type: Boolean, default: true },
      musicSuggestion: { type: Boolean, default: true },
      giftSuggestion: { type: Boolean, default: true },
      notes: { type: Boolean, default: true },
      dressCode: { type: Boolean, default: true },
      social: { type: Boolean, default: true }
    },
    notesText: { type: String, default: '' },
    images: [{ type: String }],
    expiresAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ['active', 'expired', 'archived'],
      default: 'active'
    }
  },
  { timestamps: true }
);

export default mongoose.model<IInvitation>('Invitation', InvitationSchema);
*/