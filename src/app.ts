import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { errorHandler } from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';
import eventRoutes from './routes/event.routes';
import invitationRoutes from './routes/invitation.routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Inicialización de Passport
app.use(passport.initialize());

// Documentación Swagger
//const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/invitations', invitationRoutes);

// Middleware para manejo de errores
app.use(errorHandler);

export default app;
