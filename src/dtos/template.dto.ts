import { z } from 'zod';
import mongoose from 'mongoose';

// 🎨 DTO para crear un nuevo template
export const CreateTemplateDTO = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(300).optional(),
  category: z.enum(['wedding', 'communion', 'birthday', 'corporate', 'other']),
  version: z.string().min(1),
  previewImage: z.string().url().optional(),
  theme: z.object({
    colors: z.record(z.string()),
    fonts: z.record(z.string()),
    images: z.record(z.string())
  }),
  availableFields: z.object({
    dressCode: z.boolean(),
    locationMap: z.boolean(),
    musicSuggestion: z.boolean(),
    rsvpNotes: z.boolean(),
    giftSuggestion: z.boolean(),
    notes: z.boolean(),
    gallery: z.boolean()
  }),
  isPremium: z.boolean().optional(),
  isActive: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  createdBy: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id)).optional()
});

export type CreateTemplateDTOType = z.infer<typeof CreateTemplateDTO>;

// ✏️ DTO para actualizar un template (todos los campos opcionales)
export const UpdateTemplateDTO = CreateTemplateDTO.partial();
export type UpdateTemplateDTOType = z.infer<typeof UpdateTemplateDTO>;

// 📦 Respuesta pública (sin mapas internos de Mongo ni referencias)
export const TemplateResponseDTO = CreateTemplateDTO.extend({
  _id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type TemplateResponseDTOType = z.infer<typeof TemplateResponseDTO>;
