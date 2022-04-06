import * as Joi from 'joi';

export const validationSchema: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  HOST: Joi.string().default('0.0.0.0'),
  PORT: Joi.number().default(3000),
});
