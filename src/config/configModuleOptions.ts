import { ConfigModuleOptions } from "@nestjs/config";
import * as Joi from "@hapi/joi";

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: Joi.object({
    JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().required(),
    JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.number().required(),
    SENDGRID_API_KEY: Joi.string().required(),
    FRONTEND_URL: Joi.string().uri().required(),
    RESET_PASSWORD_REDIRECT_URL: Joi.string().uri().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
    DATABASE_URL: Joi.string().required(),
  }),
};
