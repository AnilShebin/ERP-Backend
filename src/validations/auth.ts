import Joi from 'joi';

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required',
    }),
    password: Joi.string()
        .min(8)
        .pattern(
            new RegExp(
                '^[a-zA-Z0-9@#$%^&*()_+\\-=\\[\\]{};:"\\|,.<>\\/?~!]{8,30}$'
            )
        ) // Updated regex
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base':
                'Password can only contain alphanumeric characters and special symbols',
            'string.empty': 'Password cannot be empty',
            'any.required': 'Password is required',
        }),
});
