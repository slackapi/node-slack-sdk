import * as log from 'loglevel';
import { noop } from './util';

let instanceCount = 0;

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
 * INTERNAL interface for components in this package that need a logging API
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
 * INTERNAL interface for getting or creating a named Logger.
 */
export function getLogger(name: string): Logger {
  // Get a unique ID for the logger.
  const instanceId = instanceCount;
  instanceCount += 1;

  // Set up the logger.
  const logger = log.getLogger(name + instanceId);

  // Wrap the original method factory with one that prepends custom information.
  const originalFactory = logger.methodFactory;
  logger.methodFactory = (methodName, logLevel, loggerName) => {
    const logMessage = originalFactory(methodName, logLevel, loggerName);

    // return a LoggingMethod
    return (...msg) => {
      // Prepend some info to the log message.
      const segments = [`[${methodName.toUpperCase()}]`, loggerName].concat(msg);

      // Daisy chain with the original method factory.
      logMessage.apply(undefined, segments);
    };
  };

  return logger;
}

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

/**
 * INTERNAL function for transforming an external LoggingFunc type into the internal Logger interface.
 */
export function loggerFromLoggingFunc(name: string, loggingFunc: LoggingFunc): Logger {
  // Get a unique ID for the logger.
  const instanceId = instanceCount;
  instanceCount += 1;

  // Set up the logger.
  const logger = log.getLogger(name + instanceId);

  // Set the method factory to reroute logs to the provided log function.
  logger.methodFactory = (methodName: LogLevel, logLevel, loggerName) => {
    if (isMoreSevere(methodName, logLevel)) {
      return (...msg) => {
        loggingFunc(methodName, `${loggerName} ${msg.map(m => JSON.stringify(m)).join(' ')}`);
      };
    }

    return noop;
  };

  return logger;
}
