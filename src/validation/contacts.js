import Joi from 'joi';

export const validationContactShema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string!',
    'string.min': 'Minimum number of characters in a name is 3!',
    'string.max': 'The maximum number of characters in a name is 20!',
    'any.required': 'Name is required!',
  }),
  phoneNumber: Joi.string().min(7).max(20).required().messages({
    'string.base': 'Phone number must be a string!',
    'string.min': 'The minimum number of digits in the number must be 7!',
    'string.max': 'The maximum number of digits in a number must be 20!',
    'any.required': 'Phone number is required!',
  }),
  email: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Email must be a string!',
    'string.min': 'Minimum number of characters in email is 3!',
    'string.max': 'The maximum number of characters in an email is 20!',
    'any.required': 'Email is required!',
  }),
  isFavourite: Joi.boolean().required().default(false).messages({
    'string.base': 'Set the value to false or true!',
    'any.required': 'Favorite is required!',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .required()
    .messages({
      'string.base': 'Contact type must be a string!',
      'any.required': 'Contact type is required!',
    }),
  userId: Joi.string(),
  photo: Joi.string,
});

export const validationUpdateContactShema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string!',
    'string.min': 'Minimum number of characters in a name is 3!',
    'string.max': 'The maximum number of characters in a name is 20!',
  }),
  phoneNumber: Joi.string().min(7).max(20).messages({
    'string.base': 'Phone number must be a string!',
    'string.min': 'The minimum number of digits in the number must be 7!',
    'string.max': 'The maximum number of digits in a number must be 20!',
  }),
  email: Joi.string().min(3).max(30).messages({
    'string.base': 'Email must be a string!',
    'string.min': 'Minimum number of characters in email is 3!',
    'string.max': 'The maximum number of characters in an email is 20!',
  }),
  isFavourite: Joi.boolean().default(false).messages({
    'string.base': 'Set the value to false or true!',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .messages({
      'string.base': 'Contact type must be a string!',
    }),
  photo: Joi.string,
});
