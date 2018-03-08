/** 
 * @module @slack/client/dist/logger
 */

/**
 * INTERNAL interface for components in this package that need a logging API
 * @interface module:@slack/client/dist/logger.Logger
 */
export class Logger {
  /**
   * Output debug message to console
   * @param {Array<any>} msg any data to log to the console
   * @function module:@slack/client/dist/logger.Logger#debug
   */
  debug() {}

  /**
   * Output error message to console
   * @param {Array<any>} msg any data to log to the console
   * @function module:@slack/client/dist/logger.Logger#error
   */
  error() {}

  /**
   * Output info message to console
   * @param {Array<any>} msg any data to log to the console
   * @function module:@slack/client/dist/logger.Logger#info
   */
  info() {}

  /**
   * This disables all logging below the given level, so that after a log.setLevel("warn") call log.warn("something")
   * or log.error("something") will output messages, but log.info("something") will not.
   * @param {module:@slack/client/dist/logger.LogLevel} level as a string, like 'error' (case-insensitive)
   * @function module:@slack/client/dist/logger.Logger#setLevel
   */
  setLevel() {}

  /**
   * Output warn message to console
   * @param {Array<any>} msg any data to log to the console
   * @function module:@slack/client/dist/logger.Logger#warn
   */
  warn() {}
}

/**
 * INTERNAL function for transforming an external LoggerFunc type into the internal Logger interface
 * @param {string} name
 * @param {module:@slack/client.LoggingFunc} loggingFunc
 * @returns {module:@slack/client/dist/logger.Logger}
 */
export function loggerFromLoggingFunc() {}
