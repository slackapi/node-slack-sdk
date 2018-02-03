import { Appender, addAppender, clearAppenders, Logger, logLevel } from 'aurelia-logging';
import { ConsoleAppender } from 'aurelia-logging-console';
import { ErrorCode, errorWithCode } from './errors';

export interface LoggingFunc {
  (level: string, message: string): void;
}

export enum LogLevel {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
}

class SimpleAppender implements Appender {
  constructor(private transport: LoggingFunc) {}
  public debug(_logger: Logger, ...rest: any[]) {
    this.transport.apply(null, ['debug', ...rest]);
  }
  public info(_logger: Logger, ...rest: any[]) {
    this.transport.apply(null, ['info', ...rest]);
  }
  public warn(_logger: Logger, ...rest: any[]) {
    this.transport.apply(null, ['warn', ...rest]);
  }
  public error(_logger: Logger, ...rest: any[]) {
    this.transport.apply(null, ['error', ...rest]);
  }
}

// Default appender is to the console
addAppender(new ConsoleAppender());

export function replaceLogging(transport: LoggingFunc) {
  clearAppenders();
  addAppender(new SimpleAppender(transport));
}

export function setLogLevel(logger: Logger, level: LogLevel) {
  // This is a helper that translates the enum values into numbers
  const numericLogLevel = logLevel[level];
  if (Number.isInteger(numericLogLevel)) {
    logger.setLevel(numericLogLevel);
  } else {
    throw errorWithCode(new Error('log level value is invalid'), ErrorCode.InvalidLogLevel);
  }
}
