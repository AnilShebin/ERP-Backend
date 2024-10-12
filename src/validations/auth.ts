// validations/auth.ts

import * as Joi from 'joi';

export const loginSchema = Joi.object({
    staff_id: Joi.number().integer().required(),
    password: Joi.string().min(6).required(),
});

export const registerSchema = Joi.object({
    name: Joi.string().max(100).required(),
    staff_id: Joi.number().integer().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().optional(), // Add the phone field here
    roleId: Joi.number().integer().required()
});