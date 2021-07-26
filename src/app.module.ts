import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/article/article.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/test', { useCreateIndex: true }), ArticleModule, CategoryModule, CommentModule, TagModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
