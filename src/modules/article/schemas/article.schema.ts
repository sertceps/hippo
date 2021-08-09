import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tag } from '../../tag/schemas/tag.schema';
import { Category } from '../../category/schemas/category.schema';
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

  @Prop()
  abstract: string;

  @Prop()
  content: string;

  @Prop({ type: Boolean, default: false, select: false })
  deleted: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
