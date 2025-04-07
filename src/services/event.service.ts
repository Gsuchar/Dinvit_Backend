import Event, { IEvent } from '../models/event.model';

export const createEventService = async (data: { title: string; description?: string; date: Date; template?: string; organizer: string }): Promise<IEvent> => {
  const { title, description, date, template, organizer } = data;
  const event = new Event({ title, description, date, template, organizer });
  await event.save();
  return event;
};

export const getEventsService = async (): Promise<IEvent[]> => {
  const events = await Event.find();
  return events;
};

export const updateEventService = async (id: string, data: any): Promise<IEvent | null> => {
  const updatedEvent = await Event.findByIdAndUpdate(id, data, { new: true });
  return updatedEvent;
};

export const deleteEventService = async (id: string): Promise<IEvent | null> => {
  const deletedEvent = await Event.findByIdAndDelete(id);
  return deletedEvent;
};
