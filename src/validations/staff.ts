import Joi from 'joi';

export const staffSchema = Joi.object({
  first_name: Joi.string().required().messages({
    'string.empty': 'First name is required',
    'any.required': 'First name is required',
  }),
  last_name: Joi.string().required().messages({
    'string.empty': 'Last name is required',
    'any.required': 'Last name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address',
    'any.required': 'Email is required',
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'Phone number is required',
    'any.required': 'Phone number is required',
  }),
  gender: Joi.string().required().messages({
    'string.empty': 'Gender is required',
    'any.required': 'Gender is required',
  }),
  alternate_number: Joi.string().allow(null, '').optional(), // Optional field
  roleId: Joi.number().integer().required().messages({ // Updated to roleId
    'number.base': 'Role ID must be a number',
    'any.required': 'Role ID is required',
  }),
  designation: Joi.string().required().messages({
    'string.empty': 'Designation is required',
    'any.required': 'Designation is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
  documents_collected: Joi.boolean().required().messages({
    'boolean.base': 'Documents collected must be a boolean value',
    'any.required': 'Documents collected is required',
  }),
  staff_id: Joi.string().required().messages({
    'string.empty': 'Staff ID is required',
    'any.required': 'Staff ID is required',
  }),
  isVerified: Joi.boolean().required().messages({
    'boolean.base': 'Is Verified must be a boolean value',
    'any.required': 'Is Verified is required',
  }),
});
