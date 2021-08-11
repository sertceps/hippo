import { registerAs } from '@nestjs/config';

export const CommonConfigRegister = registerAs('common', () => ({
  port: parseInt(process.env.COMMON_PORT)
}));
