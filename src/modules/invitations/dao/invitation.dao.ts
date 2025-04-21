import { InvitationModel } from '@/modules/invitations/models/invitation.model';
import { CreateInvitationDTOType } from '@/modules/invitations/dtos/invitation.dto';
import { IInvitation } from '@/modules/invitations/models/invitation.model';
import mongoose from 'mongoose';

export class InvitationDAO {
  // Crear nueva invitación
  async createInvitation(data: CreateInvitationDTOType): Promise<IInvitation> {
    const invitation = await InvitationModel.create(data);
    return invitation;
  }

  // Obtener invitación por ID
  async getInvitationById(id: string): Promise<IInvitation | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return InvitationModel.findById(id).exec();
  }

  // Obtener por link único
  async getInvitationByUniqueLink(link: string): Promise<IInvitation | null> {
    return InvitationModel.findOne({ uniqueLink: link }).exec();
  }

  // Actualizar una invitación existente
  async updateInvitation(id: string, data: Partial<IInvitation>): Promise<IInvitation | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return InvitationModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Eliminar una invitación por ID
  async deleteInvitation(id: string): Promise<IInvitation | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return InvitationModel.findByIdAndDelete(id).exec();
  }

  // Obtener todas las invitaciones de un usuario
  async getAllInvitationsByUser(userId: string): Promise<IInvitation[]> {
    if (!mongoose.Types.ObjectId.isValid(userId)) return [];
    return InvitationModel.find({ userId }).lean().exec();
  }
}

export const invitationDAO = new InvitationDAO();
