import Invitation, { IInvitation } from '../models/invitation.model';

export const createInvitationService = async (data: { event: string; title: string; honoree: string; date: Date; time: string; location: string; dressCode?: string; agenda?: string; uniqueLink: string; music?: string; images?: string[]; language: 'es' | 'en' | 'pt' }): Promise<IInvitation> => {
  const invitation = new Invitation(data);
  await invitation.save();
  return invitation;
};

export const getInvitationsService = async (): Promise<IInvitation[]> => {
  const invitations = await Invitation.find();
  return invitations;
};

export const updateInvitationService = async (id: string, data: any): Promise<IInvitation | null> => {
  const updatedInvitation = await Invitation.findByIdAndUpdate(id, data, { new: true });
  return updatedInvitation;
};

export const deleteInvitationService = async (id: string): Promise<IInvitation | null> => {
  const deletedInvitation = await Invitation.findByIdAndDelete(id);
  return deletedInvitation;
};

export const rsvpInvitationService = async (id: string, rsvpData: { name: string; email: string; guests: number; allergies?: string; suggestions?: string }): Promise<IInvitation | null> => {
  const invitation = await Invitation.findById(id);
  if (!invitation) {
    throw new Error('Invitación no encontrada');
  }
  invitation.rsvp = rsvpData;
  await invitation.save();
  return invitation;
};
