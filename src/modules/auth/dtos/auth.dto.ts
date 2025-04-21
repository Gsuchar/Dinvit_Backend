import { z } from 'zod';

// 🔐 Registro de usuario local
export const RegisterDTO = z.object({
  name: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  email: z.string().email(),
  phone: z.string().min(5),
  password: z.string().min(6),
  plan: z.enum(['basic', 'pro', 'premium']).optional()
});

export type RegisterDTOType = z.infer<typeof RegisterDTO>;

// 🔓 Login con email y contraseña
export const LoginDTO = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export type LoginDTOType = z.infer<typeof LoginDTO>;

// 📧 Solicitar recuperación de contraseña
export const ForgotPasswordDTO = z.object({
  email: z.string().email()
});

export type ForgotPasswordDTOType = z.infer<typeof ForgotPasswordDTO>;

// 🔑 Resetear contraseña con token
export const ResetPasswordDTO = z.object({
  token: z.string().min(10),
  newPassword: z.string().min(6)
});

export type ResetPasswordDTOType = z.infer<typeof ResetPasswordDTO>;

// ✅ Verificación de email mediante token
export const VerifyEmailDTO = z.object({
  token: z.string().min(10)
});

export type VerifyEmailDTOType = z.infer<typeof VerifyEmailDTO>;
