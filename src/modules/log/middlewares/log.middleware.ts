import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { HttpMethod } from '../constants/log.constant';
import { LogService } from '../log.service';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(private readonly logService: LogService) {}

  /** 请求中间件
   * @param req 请求体
   * @param res 返回体
   * @param next next 函数
   */

  async use(req: Request, res: any, next: NextFunction) {
    const ip = req.ip;
    console.log('ip is' + ip);

    const method = req.method as unknown as HttpMethod;
    console.log('method is' + method);

    const url = req.path;
    console.log('path is' + url);

    const paramDataList = [];
    if (req.body) paramDataList.push('body:' + JSON.stringify(req.body));
  }
}
