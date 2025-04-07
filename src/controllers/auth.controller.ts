import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, forgotPasswordService } from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await registerUser(req.body);
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await loginUser(req.body);
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await forgotPasswordService(req.body.email);
    res.json({ message: 'Instrucciones para recuperación de contraseña enviadas al email' });
  } catch (error: any) {
    next(error);
  }
};
