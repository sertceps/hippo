import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tag } from '../../tag/schemas/tag.schema';
import { Category } from '../../category/schemas/category.schema';
import { Comment } from '../../comment/schemas/comment.schema';
import { User } from '../../user/schemas/user.schema';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop()
  title: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Tag' }] })
  tags: Tag[];

  @Prop({ type: String })
  content: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
