// src/validations/auth.ts
import Joi from 'joi';

export const registerSchema = Joi.object({
  company_name: Joi.string().max(100).required(),
  company_email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  password: Joi.string().min(6).required(),
});

// Define the login schema as well if needed
export const loginSchema = Joi.object({
  staff_id: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
