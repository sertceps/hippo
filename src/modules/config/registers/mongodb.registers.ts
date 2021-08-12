import { registerAs } from '@nestjs/config';

export const MongoDbRegister = registerAs('mongodb', () => ({
  uri: process.env.MONGODB_URI,
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD
}));
