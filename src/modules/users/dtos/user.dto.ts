import { z } from 'zod';
import mongoose from 'mongoose';

// ✏️ DTO para actualizar perfil (desde el panel del usuario)
export const UpdateUserDTO = z.object({
  name: z.string().min(2).max(30).optional(),
  lastName: z.string().min(2).max(30).optional(),
  username: z.string().max(30).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(5).optional(),
  password: z.string().min(6).optional()
});

export type UpdateUserDTOType = z.infer<typeof UpdateUserDTO>;

// 🔐 DTO exclusivo para modificación administrativa
export const AdminUpdateUserDTO = UpdateUserDTO.extend({
  role: z.enum(['admin', 'user']).optional(),
  plan: z.enum(['basic', 'pro', 'premium']).optional(),
  status: z.enum(['pending', 'active', 'banned', 'inactive']).optional()
});

export type AdminUpdateUserDTOType = z.infer<typeof AdminUpdateUserDTO>;

// 📦 DTO para la respuesta pública (perfil del usuario sin exponer contraseña/token)
export const UserResponseDTO = z.object({
  _id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: 'Invalid ID'
  }),
  name: z.string(),
  lastName: z.string(),
  username: z.string().optional(),
  email: z.string(),
  phone: z.string(),
  role: z.enum(['admin', 'user']),
  plan: z.enum(['basic', 'pro', 'premium']),
  status: z.enum(['pending', 'active', 'banned', 'inactive']),
  authProvider: z.enum(['local', 'google', 'facebook']),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type UserResponseDTOType = z.infer<typeof UserResponseDTO>;
