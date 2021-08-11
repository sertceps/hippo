import { ValidationPipe } from './modules/common/pipes/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigType } from '@nestjs/config';
import { CommonConfigRegister } from './modules/config/registers/common.register';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const commonConfig = app.select(AppModule).get<ConfigType<typeof CommonConfigRegister>>(CommonConfigRegister.KEY);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(commonConfig.port);
  // TODO: patch 方法
}
bootstrap();
