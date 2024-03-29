import { ValidationPipe } from './modules/common/pipes/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigType } from '@nestjs/config';
import { CommonConfigRegister } from './modules/config/registers/common.register';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const commonConfig = app.select(AppModule).get<ConfigType<typeof CommonConfigRegister>>(CommonConfigRegister.KEY);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Hippo')
    .setDescription('Hippo Swagger Document')
    .addBearerAuth({ type: 'apiKey', in: 'header', name: 'Authorization' })
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, { explorer: true, swaggerOptions: { docExpansion: false } });

  await app.listen(commonConfig.port);
  // TODO improve
  // 拦截器、异常过滤、中间件
  // TODO private article
  // TODO block user
  //  同级权限？
  // TODO file upload
  // TODO 邮件通知
  // 直接存入 markdown?
  // TODO 限制评论数
  // 除了 article，也要校验用户？
  // follow & email & like & notify
}
bootstrap();
