import * as Joi from 'joi';

export const ConfigValidation = Joi.object({
  // MongoDb
  MONGODB_URI: Joi.string().required()
});
