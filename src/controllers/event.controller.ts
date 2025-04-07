import { Request, Response, NextFunction } from 'express';
import { createEventService, getEventsService, updateEventService, deleteEventService } from '../services/event.service';

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Se asume que req.user contiene la información del usuario autenticado
    const organizer = req.user?.id;
    const event = await createEventService({ ...req.body, organizer });
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await getEventsService();
    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedEvent = await updateEventService(id, req.body);
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.json(updatedEvent);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedEvent = await deleteEventService(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.json({ message: 'Evento eliminado' });
  } catch (error) {
    next(error);
  }
};
