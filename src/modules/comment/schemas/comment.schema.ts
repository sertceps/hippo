import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Article' })
  article_id: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ required: false })
  website: string;

  @Prop()
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
