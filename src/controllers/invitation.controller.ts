import { Request, Response, NextFunction } from 'express';
import { createInvitationService, getInvitationsService, updateInvitationService, deleteInvitationService, rsvpInvitationService } from '../services/invitation.service';

export const createInvitation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invitation = await createInvitationService(req.body);
    res.status(201).json(invitation);
  } catch (error) {
    next(error);
  }
};

export const getInvitations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invitations = await getInvitationsService();
    res.json(invitations);
  } catch (error) {
    next(error);
  }
};

export const updateInvitation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedInvitation = await updateInvitationService(id, req.body);
    if (!updatedInvitation) {
      return res.status(404).json({ message: 'Invitación no encontrada' });
    }
    res.json(updatedInvitation);
  } catch (error) {
    next(error);
  }
};

export const deleteInvitation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedInvitation = await deleteInvitationService(id);
    if (!deletedInvitation) {
      return res.status(404).json({ message: 'Invitación no encontrada' });
    }
    res.json({ message: 'Invitación eliminada' });
  } catch (error) {
    next(error);
  }
};

export const rsvpInvitation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const invitation = await rsvpInvitationService(id, req.body);
    res.json({ message: 'RSVP actualizado', invitation });
  } catch (error) {
    next(error);
  }
};
