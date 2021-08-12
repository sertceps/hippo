import { registerAs } from '@nestjs/config';

export const UserConfigRegister = registerAs('user', () => ({
  superUserEmail: process.env.SUPER_USER_EMAIL,
  superUserPassword: process.env.SUPER_USER_PASSWORD
}));
