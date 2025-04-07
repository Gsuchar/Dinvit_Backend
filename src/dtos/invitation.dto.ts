import Joi from 'joi';

export const createInvitationSchema = Joi.object({
  event: Joi.string().required(),
  title: Joi.string().required(),
  honoree: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.string().required(),
  location: Joi.string().required(),
  dressCode: Joi.string().optional(),
  agenda: Joi.string().optional(),
  uniqueLink: Joi.string().required(),
  music: Joi.string().optional(),
  images: Joi.array().items(Joi.string()).optional(),
  language: Joi.string().valid('es', 'en', 'pt').optional()
});

export const rsvpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  guests: Joi.number().integer().min(0).required(),
  allergies: Joi.string().optional(),
  suggestions: Joi.string().optional()
});
