/** HTTP请求方法 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

/** 日志级别 */
export enum LogLevel {
  /** 追溯 */
  Trace = 'trace',

  /** 调试 */
  Debug = 'debug',

  /** 信息 */
  Info = 'info',

  /** 警告 */
  Warn = 'warn',

  /** 错误 */
  Error = 'error',

  /** 严重错误 */
  Fatal = 'fatal'
}
