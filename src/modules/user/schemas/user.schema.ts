import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Website, WebsiteSchema } from './website.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ name: 'user_name' })
  userName: string;

  @Prop()
  email: string;

  @Prop({ type: Date, required: false })
  birth: Date;

  @Prop({ required: false })
  gender: string;

  @Prop({ required: false })
  background: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ type: [WebsiteSchema], required: false })
  websites: Website[];

  @Prop({ required: false })
  description: string;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
