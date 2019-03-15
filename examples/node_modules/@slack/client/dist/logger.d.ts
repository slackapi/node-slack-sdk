/**
 * Severity levels for log entries
 */
export declare enum LogLevel {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    DEBUG = "debug",
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
 * INTERNAL interface for getting or creating a named Logger
 */
export declare const getLogger: (name: string) => Logger;
/**
 * INTERNAL function for transforming an external LoggerFunc type into the internal Logger interface
 * @param name
 * @param loggingFunc
 */
export declare function loggerFromLoggingFunc(name: string, loggingFunc: LoggingFunc): Logger;
