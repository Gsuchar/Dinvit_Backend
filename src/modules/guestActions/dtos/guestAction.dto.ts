import { z } from 'zod';
import mongoose from 'mongoose';

// 🎯 DTO para crear una acción del invitado
export const CreateGuestActionDTO = z.object({
  invitationId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: 'Invalid invitationId'
  }),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  companions: z.object({
    count: z.number().int().min(0),
    names: z.array(z.string()).optional()
  }).optional(),
  status: z.enum(['y', 'n', 'p']), // yes / no / pending
  notes: z.string().optional(),
  suggestions: z.string().optional(),
  musicSuggestions: z.array(z.object({
    artist: z.string().min(1),
    title: z.string().min(1),
    link: z.string().url().optional()
  })).optional()
});

export type CreateGuestActionDTOType = z.infer<typeof CreateGuestActionDTO>;

// ✏️ DTO para actualización (todos los campos opcionales)
export const UpdateGuestActionDTO = CreateGuestActionDTO.partial();
export type UpdateGuestActionDTOType = z.infer<typeof UpdateGuestActionDTO>;

// 🧾 Para respuesta del backend
export type GuestActionResponseDTO = CreateGuestActionDTOType & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};
