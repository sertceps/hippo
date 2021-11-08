import { Module } from '@nestjs/common';
import SubController from './sub.controller';

@Module({
  controllers: [SubController]
})
export default class SubModule {}
