import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  website: string;

  @Prop()
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
