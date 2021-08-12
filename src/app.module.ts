import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/article/article.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { CommonConfigRegister } from './modules/config/registers/common.register';
import { MongoDbRegister } from './modules/config/registers/mongodb.registers';
import { UserConfigRegister } from './modules/config/registers/user.register';
import { ConfigValidation } from './modules/config/validations/config.validation';
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ConfigValidation,
      validationOptions: { allowUnknown: true, abortEarly: true },
      load: [CommonConfigRegister, MongoDbRegister, UserConfigRegister]
    }),

    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigType<typeof MongoDbRegister>) => ({
        uri: config.uri,
        useCreateIndex: config.useCreateIndex
      }),
      inject: [MongoDbRegister.KEY]
    }),

    ArticleModule,
    CategoryModule,
    CommentModule,
    TagModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
