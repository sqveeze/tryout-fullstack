import * as Joi from 'joi';

export const validationSchema: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  HOST: Joi.string().default('0.0.0.0'),
  PORT: Joi.number().default(3000),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USERNAME: Joi.string().required(),
  // Empty needed because pg in localhost has no password.
  DATABASE_PASSWORD: Joi.string().allow(''),
  DATABASE_NAME: Joi.string().required(),
  EXCHANGE_API_BASE_URL: Joi.string().required(),
});
