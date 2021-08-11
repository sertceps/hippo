import * as Joi from 'joi';

export const ConfigValidation = Joi.object({
  // Common
  COMMON_PORT: Joi.number().required().default(3000),
  COMMON_JWT_SECRET: Joi.string().required(),
  COMMON_JWT_EXPIRES_IN: Joi.number().required().default(3600000),
  // MongoDb
  MONGODB_URI: Joi.string().required()
});
