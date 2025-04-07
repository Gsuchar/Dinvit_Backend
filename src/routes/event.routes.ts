import { Router } from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../controllers/event.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import { createEventSchema } from '../dtos/event.dto';

const router = Router();

router.post('/', authenticateJWT, validateBody(createEventSchema), createEvent);
router.get('/', authenticateJWT, getEvents);
router.put('/:id', authenticateJWT, updateEvent);
router.delete('/:id', authenticateJWT, deleteEvent);

export default router;
