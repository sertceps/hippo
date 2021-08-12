import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogLevel } from './constants/log.constant';
import { LogInterface } from './interfaces/log.interface';
import { Log, LogDocument } from './schemas/log.schema';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private readonly logModel: Model<LogDocument>) {}

  /** info 级别日志 */
  async info(log: LogInterface) {
    this.create(LogLevel.Info, log);
  }

  /** warn 级别日志 */
  async warn(log: LogInterface) {
    this.create(LogLevel.Warn, log);
  }

  /** error 级别日志 */
  async error(log: LogInterface) {
    this.create(LogLevel.Error, log);
  }

  /** fatal 级别日志 */
  async fatal(log: LogInterface) {
    this.create(LogLevel.Fatal, log);
  }

  async create(level: LogLevel, log: LogInterface) {
    this.logModel.create({ level, ...log });
  }
}
