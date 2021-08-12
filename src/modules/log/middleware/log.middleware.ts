import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { HttpMethod } from '../constants/log.constant';
import { LogService } from '../log.service';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(private readonly logService: LogService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const ip = req.ip;
    const method = req.method as unknown as HttpMethod;
    const url = req.path;
    const paramDataList = [];

    // will body content of article request too long?
    if (req.body && JSON.stringify(req.body) !== '{}') paramDataList.push('body:' + JSON.stringify(req.body));
    if (req.params && JSON.stringify(req.params) !== '{}') paramDataList.push('param:' + JSON.stringify(req.params));
    if (req.query && JSON.stringify(req.query) !== '{}') paramDataList.push('param:' + JSON.stringify(req.query));

    const requestMessage = paramDataList.length > 0 ? paramDataList.join('AND') : 'No Data';

    // password is in res.statusMessage
    const finishHandler = () => {
      const responseCode = res.statusCode;

      switch (Math.floor(responseCode / 100)) {
        case 2:
          this.logService.info({ method, url, requestMessage, responseCode, responseMessage: res.statusMessage, interval: Date.now() - startTime, ip });
          break;
        case 3:
          if (responseCode == 304)
            this.logService.info({ method, url, requestMessage, responseCode, responseMessage: res.statusMessage, interval: Date.now() - startTime, ip });
          else this.logService.warn({ method, url, requestMessage, responseCode, responseMessage: res.statusMessage, interval: Date.now() - startTime, ip });
          break;
        case 4:
          this.logService.error({ method, url, requestMessage, responseCode, responseMessage: res.statusMessage, interval: Date.now() - startTime, ip });
          break;
        case 5:
          this.logService.fatal({ method, url, requestMessage, responseCode, responseMessage: res.statusMessage, interval: Date.now() - startTime, ip });
          break;
        default:
          this.logService.fatal({ method, url, requestMessage, responseCode, responseMessage: res.statusMessage, interval: Date.now() - startTime, ip });
      }
    };

    res.once('finish', finishHandler);

    next();
  }
}
