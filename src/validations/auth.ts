// validations/auth.ts
import * as Joi from 'joi';

export const loginSchema = Joi.object({
    staff_id: Joi.string().required(), // Changed to string for staff_id
    password: Joi.string().min(6).required(),
});
