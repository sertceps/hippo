import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../article/schemas/article.schema';
import { Category, CategorySchema } from '../category/schemas/category.schema';
import { Tag, TagSchema } from '../tag/schemas/tag.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { TrashController } from './trash.controller';
import { TrashService } from './trash.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Article.name, schema: ArticleSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Tag.name, schema: TagSchema }
    ])
  ],
  controllers: [TrashController],
  providers: [TrashService]
})
export class TrashModule {}
