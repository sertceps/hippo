import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagDocument = Tag & Document;

@Schema()
export class Tag {
  @Prop()
  tag: string;

  @Prop({ type: Boolean, default: false, select: false })
  deleted: boolean;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
