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
  // TODO improve
  // 拦截器、异常过滤
  // TODO file upload
  // 直接存入 markdown?
  // swagger
  // 邮件通知
}
bootstrap();
