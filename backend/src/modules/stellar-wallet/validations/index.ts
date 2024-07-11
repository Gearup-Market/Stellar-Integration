import Joi from "joi";

export const createStellarWalletSchema = {
  body: Joi.object({
    userId: Joi.string().required(),
    passsword: Joi.string().required(),
  }),
};

export const getStellarWalletSchema = {
  params: Joi.object({
    userId: Joi.string().required(),
  }),
};
