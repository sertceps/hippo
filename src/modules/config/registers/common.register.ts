import { registerAs } from '@nestjs/config';

export const CommonConfigRegister = registerAs('common', () => ({
  port: parseInt(process.env.COMMON_PORT),
  jwtSecret: process.env.COMMON_JWT_SECRET,
  jwtExpiresIn: parseInt(process.env.COMMON_JWT_EXPIRES_IN),
  passwordSalt: process.env.COMMON_PASSWORD_SALT
}));
