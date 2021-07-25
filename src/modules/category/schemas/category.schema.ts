import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  category: string;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
