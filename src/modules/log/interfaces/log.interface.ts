import { HttpMethod } from '../constants/log.constant';

export interface LogInterface {
  method: HttpMethod;

  url: string;

  requestMessage: string;

  responseCode: string;

  responseMessage: string;

  interval: number;

  ip: string;
}
