import Joi from "joi";

export const userSignUpSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    phoneNumber: Joi.string().optional().min(10),
  }),
};

export const userSignInSchema = {
  body: Joi.object({
    email: Joi.string().email().optional(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().optional().min(10),
  }),
};
