import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import SubModule from './sub.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SubModule, {
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://localhost:1883'
    }
  });

  app.listen();
  // console.log('mqtt listening...');
}

bootstrap();
