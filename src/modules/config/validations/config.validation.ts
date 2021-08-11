import * as Joi from 'joi';

export const ConfigValidation = Joi.object({
  // Common
  COMMON_PORT: Joi.number().required().default(3000),
  // MongoDb
  MONGODB_URI: Joi.string().required()
});
