import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB conectado exitosamente');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    throw error;
  }
};
