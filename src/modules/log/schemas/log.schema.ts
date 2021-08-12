import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HttpMethod, LogLevel } from '../constants/log.constant';

export type LogDocument = Log & Document;

/** 请求日志 */
@Schema()
export class Log {
  /** 请求方法 */
  @Prop({ type: String, enum: HttpMethod })
  method: HttpMethod;

  /** 请求 URL */
  @Prop()
  url: string;

  /** 请求信息 */
  @Prop()
  requestMessage: string;

  /** 返回状态码 */
  @Prop()
  responseCode: string;

  /** 返回信息 */
  @Prop()
  responseMessage: string;

  /** 请求执行时间 */
  @Prop()
  interval: number;

  /** 请求来源 IP */
  @Prop()
  ip: string;

  /** 日志级别 */
  @Prop({ type: String, enum: LogLevel })
  level: LogLevel;

  /** 创建时间 */
  @Prop({ type: Date, index: true, default: new Date() })
  createdAt: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
