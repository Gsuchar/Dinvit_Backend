import { z } from 'zod';
import mongoose from 'mongoose';

// ✅ DTO para crear una invitación
export const CreateInvitationDTO = z.object({
  userId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: 'Invalid userId'
  }),
  templateId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: 'Invalid templateId'
  }),
  uniqueLink: z.string().min(5),
  title: z.string().min(1),
  honoree: z.string().min(1),
  welcomeText: z.string().optional(),
  date: z.coerce.date(),
  time: z.string(),
  location: z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    country: z.string(),
    location: z.string().optional()
  }),
  dressCode: z.string().optional(),
  language: z.enum(['es', 'en', 'pt']),
  music: z.string().optional(),
  active: z.object({
    gallery: z.boolean(),
    countDown: z.boolean(),
    musicSuggestion: z.boolean(),
    giftSuggestion: z.boolean(),
    notes: z.boolean(),
    dressCode: z.boolean(),
    social: z.boolean()
  }),
  notesText: z.string().optional(),
  images: z.array(z.string()),
  expiresAt: z.coerce.date(),
  status: z.enum(['active', 'expired', 'archived']).optional()
});

// ✅ Tipo inferido de TypeScript
export type CreateInvitationDTOType = z.infer<typeof CreateInvitationDTO>;

// ✏️ Para actualizar (todos los campos opcionales)
export const UpdateInvitationDTO = CreateInvitationDTO.partial();
export type UpdateInvitationDTOType = z.infer<typeof UpdateInvitationDTO>;

// 🧾 Para respuestas del backend (opcional, si querés tenerlo separado de Mongoose)
export type InvitationResponseDTO = CreateInvitationDTOType & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};
