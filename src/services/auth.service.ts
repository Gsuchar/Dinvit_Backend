import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User, { IUser } from '../models/user.model';
import { JWT_SECRET } from '../utils/jwt';

export const registerUser = async (data: { username: string; email: string; password: string; role?: 'admin' | 'guest' }): Promise<IUser> => {
  const { username, email, password, role } = data;
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: IUser = new User({
    username,
    email,
    password: hashedPassword,
    role: role || 'guest'
  });
  
  await newUser.save();
  return newUser;
};

export const loginUser = async (data: { email: string; password: string }): Promise<string> => {
  const { email, password } = data;
  const user: IUser | null = await User.findOne({ email });
  if (!user) {
    throw new Error('Credenciales inválidas');
  }
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Credenciales inválidas');
  }
  
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  return token;
};

export const forgotPasswordService = async (email: string): Promise<void> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('No se encontró un usuario con ese email');
  }
  
  const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'your_test_user@ethereal.email',
      pass: process.env.SMTP_PASS || 'your_test_password'
    }
  });
  
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'no-reply@example.com',
    to: user.email,
    subject: 'Recuperación de contraseña',
    text: `Has solicitado recuperar tu contraseña.\n\nHaz click en el siguiente enlace para restablecerla:\n\n${resetUrl}\n\nEste enlace expirará en 1 hora.`
  };
  
  await transporter.sendMail(mailOptions);
};









/*import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User, { IUser } from '../models/user.model';
import { JWT_SECRET } from '../utils/jwt';

export const registerUser = async (data: { username: string; email: string; password: string; role?: 'admin' | 'guest' }): Promise<IUser> => {
  const { username, email, password, role } = data;
  
  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }
  
  // Encriptar contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: IUser = new User({
    username,
    email,
    password: hashedPassword,
    role: role || 'guest'
  });
  
  await newUser.save();
  return newUser;
};

export const loginUser = async (data: { email: string; password: string }): Promise<string> => {
  const { email, password } = data;
  const user: IUser | null = await User.findOne({ email });
  if (!user) {
    throw new Error('Credenciales inválidas');
  }
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Credenciales inválidas');
  }
  
  // Generar token JWT
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  return token;
};

export const forgotPasswordService = async (email: string): Promise<void> => {
  // Buscar el usuario por email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('No se encontró un usuario con ese email');
  }
  
  // Generar token de reseteo de contraseña (válido por 1 hora)
  const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
  // Almacenar el token y su expiración en el usuario
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hora de validez
  await user.save();
  
  // Configurar el transportador de nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'your_test_user@ethereal.email',
      pass: process.env.SMTP_PASS || 'your_test_password'
    }
  });
  
  // Construir la URL de reseteo usando la variable de entorno FRONTEND_URL
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'no-reply@example.com',
    to: user.email,
    subject: 'Recuperación de contraseña',
    text: `Has solicitado recuperar tu contraseña. Haz click en el siguiente enlace para restablecerla: ${resetUrl}`
  };
  
  // Enviar el email
  await transporter.sendMail(mailOptions);
};
*/











/*import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import { JWT_SECRET } from '../utils/jwt';

export const registerUser = async (data: { username: string; email: string; password: string; role?: 'admin' | 'guest' }): Promise<IUser> => {
  const { username, email, password, role } = data;
  
  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }
  
  // Encriptar contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: IUser = new User({
    username,
    email,
    password: hashedPassword,
    role: role || 'guest'
  });
  
  await newUser.save();
  return newUser;
};

export const loginUser = async (data: { email: string; password: string }): Promise<string> => {
  const { email, password } = data;
  const user: IUser | null = await User.findOne({ email });
  if (!user) {
    throw new Error('Credenciales inválidas');
  }
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Credenciales inválidas');
  }
  
  // Generar token JWT
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  return token;
};

export const forgotPasswordService = async (email: string): Promise<void> => {
  // Aquí implementar la lógica de recuperación de contraseña.
  // Por ejemplo, se podría integrar un servicio de email.
  console.log(`Instrucciones de recuperación enviadas a ${email}`);
};
*/