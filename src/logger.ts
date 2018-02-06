import * as log from 'loglevel';
import { ErrorCode, errorWithCode } from './errors';

/**
 * Severity levels for log entries
 */
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

/**
 * Interface for functions where this package's logs can be re-routed (the default is to use stdout)
 */
export interface LoggingFunc {
  (level: LogLevel, message: string): void;
}

/**
 * Interface for Logger objects where this package's logs can be re-routed (the default is to use stdout)
 */
export interface Logger {
  /**
   * Output debug message to console
   *
   * @param msg any data to log to the console
   */
  debug(...msg: any[]): void;

  /**
   * Output info message to console
   *
   * @param msg any data to log to the console
   */
  info(...msg: any[]): void;

  /**
   * Output warn message to console
   *
   * @param msg any data to log to the console
   */
  warn(...msg: any[]): void;

  /**
   * Output error message to console
   *
   * @param msg any data to log to the console
   */
  error(...msg: any[]): void;

  /**
   * This disables all logging below the given level, so that after a log.setLevel("warn") call log.warn("something")
   * or log.error("something") will output messages, but log.info("something") will not.
   *
   * @param level as a string, like 'error' (case-insensitive)
   */
  setLevel(level: LogLevel): void;
}

/**
 * Internal interface for getting or creating a named Logger
 */
export const getLogger = log.getLogger as (name: string) => Logger;

/**
 * Checks if the parameter is a LoggingFunc or a Logger
 * @param logger
 */
export function isLogger(logger: LoggingFunc | Logger): logger is Logger {
  return (<Logger>logger).info !== undefined;
}

// TODO: move to a "util" file?
const noop = () => {}; // tslint:disable-line:no-empty

/**
 * Decides whether `level` is more severe than the `threshold` for logging. When this returns true, logs should be
 * output.
 *
 * @param level log level to check
 * @param threshold lower bound on severity, expressed as a number inside the loglevel package
 */
function isMoreSevere(level: LogLevel, threshold: number): boolean {
  if (level === LogLevel.DEBUG) {
    return threshold <= 1;
  }
  if (level === LogLevel.INFO) {
    return threshold <= 2;
  }
  if (level === LogLevel.WARN) {
    return threshold <= 3;
  }
  if (level === LogLevel.ERROR) {
    return threshold <= 4;
  }
  return true;
}

export function loggerFromLoggingFunc(name: string, loggingFunc: LoggingFunc): Logger {
  const logger = log.getLogger(name);
  // TODO: use plugin API to reroute logging to loggingFunc
  logger.methodFactory = function (methodName: LogLevel, logLevel, loggerName: string) {
    if (isMoreSevere(methodName, logLevel)) {
      return function (...msg: any[]) {
        loggingFunc(methodName, `${loggerName} ${msg.map(m => JSON.stringify(m)).join(' ')}`);
      };
    }
    return noop;
  };
  return logger;
}
