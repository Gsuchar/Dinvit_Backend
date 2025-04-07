import { Router } from 'express';
import { createInvitation, getInvitations, updateInvitation, deleteInvitation, rsvpInvitation } from '../controllers/invitation.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import { createInvitationSchema, rsvpSchema } from '../dtos/invitation.dto';

const router = Router();

router.post('/', authenticateJWT, validateBody(createInvitationSchema), createInvitation);
router.get('/', authenticateJWT, getInvitations);
router.put('/:id', authenticateJWT, updateInvitation);
router.delete('/:id', authenticateJWT, deleteInvitation);
router.post('/:id/rsvp', validateBody(rsvpSchema), rsvpInvitation);

export default router;
