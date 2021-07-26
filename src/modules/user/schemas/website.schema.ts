import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebsiteDocument = Website & Document;

@Schema()
export class Website {
  @Prop({ required: false })
  github: string;

  @Prop({ required: false })
  twitter: string;

  @Prop({ required: false })
  zhihu: string;

  @Prop({ required: false })
  weibo: string;

  @Prop({ required: false })
  gitee: string;

  @Prop({ type: [String], required: false })
  personal_websites: string[];
}

export const WebsiteSchema = SchemaFactory.createForClass(Website);
