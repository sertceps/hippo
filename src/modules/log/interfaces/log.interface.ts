import { HttpMethod } from '../constants/log.constant';

export interface LogInterface {
  method: HttpMethod;

  url: string;

  requestMessage: string;

  responseCode: number;

  responseMessage: string;

  interval: number;

  ip: string;
}
