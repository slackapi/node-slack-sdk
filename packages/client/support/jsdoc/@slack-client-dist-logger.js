/** 
 * @module @slack/client/dist/logger
 */

/**
 * Default logger which logs to stdout and stderr
 * @extends module:@slack/client.Logger
 */
export class ConsoleLogger {
  /**
   * Log a debug message
   * @param {Array<any>} msg
   * @function module:@slack/client/dist/logger.ConsoleLogger#debug
   */
  debug() {}

  /**
   * Log an error message
   * @param {Array<any>} msg
   * @function module:@slack/client/dist/logger.ConsoleLogger#error
   */
  error() {}

  /**
   * Log an info message
   * @param {Array<any>} msg
   * @function module:@slack/client/dist/logger.ConsoleLogger#info
   */
  info() {}

  /**
   * Sets the instance's log level so that only messages which are equal or more severe are output to the console.
   * @param {module:@slack/client/dist/logger.LogLevel} level
   * @function module:@slack/client/dist/logger.ConsoleLogger#setLevel
   */
  setLevel() {}

  /**
   * Set the instance's name, which will appear on each log line before the message.
   * @param {string} name
   * @function module:@slack/client/dist/logger.ConsoleLogger#setName
   */
  setName() {}

  /**
   * Log a warning message
   * @param {Array<any>} msg
   * @function module:@slack/client/dist/logger.ConsoleLogger#warn
   */
  warn() {}
}

/**
 * INTERNAL interface for getting or creating a named Logger.
 * @param {string} name
 * @param {module:@slack/client/dist/logger.LogLevel} level
 * @param {module:@slack/client.Logger} existingLogger
 * @returns {module:@slack/client.Logger}
 */
export function getLogger() {}
/**
 * INTERNAL determine if a value is a LoggingFunc
 * @param {module:@slack/client.Logger | module:@slack/client.LoggingFunc} l
 * @returns {boolean}
 */
export function isLoggingFunc() {}
/**
 * INTERNAL function for transforming an external LoggingFunc type into the Logger interface.
 * @param {string} name
 * @param {module:@slack/client.LoggingFunc} loggingFunc
 * @param {module:@slack/client/dist/logger.LogLevel} level
 * @returns {module:@slack/client.Logger}
 */
export function loggerFromLoggingFunc() {}
