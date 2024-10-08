/**
 * Severity levels for log entries.
 */
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

/**
 * Logging interface exposing different methods to log at different {@link LogLevel}s.
 */
export interface Logger {
  /**
   * Output debug message.
   * @param msg any data to log
   */
  // biome-ignore lint/suspicious/noExplicitAny: can log anything
  debug(...msg: any[]): void;

  /**
   * Output informational message.
   * @param msg any data to log
   */
  // biome-ignore lint/suspicious/noExplicitAny: can log anything
  info(...msg: any[]): void;

  /**
   * Output warning message.
   * @param msg any data to log
   */
  // biome-ignore lint/suspicious/noExplicitAny: can log anything
  warn(...msg: any[]): void;

  /**
   * Output error message.
   * @param msg any data to log
   */
  // biome-ignore lint/suspicious/noExplicitAny: can log anything
  error(...msg: any[]): void;

  /**
   * This disables all logging below the given level, so that after a `setLevel("warn")` call, `warn("something")`
   * or `error("something")` will output messages, but `info("something")` will not.
   * @param level The minimum {@link LogLevel} the {@link Logger} should output messages for.
   */
  setLevel(level: LogLevel): void;

  /**
   * Return the current {@link LogLevel}.
   */
  getLevel(): LogLevel;

  /**
   * This allows the instance to be named so that they can easily be differentiated when many loggers are sending output
   * to the same destination.
   * @param name The name the {@link Logger} should be set to.
   */
  setName(name: string): void;
}

/**
 * Default logger which logs to stdout and stderr.
 */
export class ConsoleLogger implements Logger {
  /** Setting for level */
  private level: LogLevel;

  /** Name */
  private name: string;

  /** Map of labels for each log level */
  private static labels: Map<LogLevel, string> = (() => {
    const entries = Object.entries(LogLevel) as [string, LogLevel][];
    const map = entries.map(([key, value]) => [value, `[${key}] `] as [LogLevel, string]);
    return new Map(map);
  })();

  /** Map of severity as comparable numbers for each log level */
  private static severity: { [key in LogLevel]: number } = {
    [LogLevel.ERROR]: 400,
    [LogLevel.WARN]: 300,
    [LogLevel.INFO]: 200,
    [LogLevel.DEBUG]: 100,
  };

  /** Creates a new instance of {@link ConsoleLogger}. By default, sets the {@link LogLevel} to `INFO`. */
  public constructor() {
    this.level = LogLevel.INFO;
    this.name = '';
  }

  public getLevel(): LogLevel {
    return this.level;
  }

  public setLevel(level: LogLevel): void {
    this.level = level;
  }

  public setName(name: string): void {
    this.name = name;
  }

  // biome-ignore lint/suspicious/noExplicitAny: can log anything
  public debug(...msg: any[]): void {
    if (ConsoleLogger.isMoreOrEqualSevere(LogLevel.DEBUG, this.level)) {
      console.debug(ConsoleLogger.labels.get(LogLevel.DEBUG), this.name, ...msg);
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: can log anything
  public info(...msg: any[]): void {
    if (ConsoleLogger.isMoreOrEqualSevere(LogLevel.INFO, this.level)) {
      console.info(ConsoleLogger.labels.get(LogLevel.INFO), this.name, ...msg);
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: can log anything
  public warn(...msg: any[]): void {
    if (ConsoleLogger.isMoreOrEqualSevere(LogLevel.WARN, this.level)) {
      console.warn(ConsoleLogger.labels.get(LogLevel.WARN), this.name, ...msg);
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: can log anything
  public error(...msg: any[]): void {
    if (ConsoleLogger.isMoreOrEqualSevere(LogLevel.ERROR, this.level)) {
      console.error(ConsoleLogger.labels.get(LogLevel.ERROR), this.name, ...msg);
    }
  }

  /**
   * Helper to compare two log levels and determine if a is equal or more severe than b
   */
  private static isMoreOrEqualSevere(a: LogLevel, b: LogLevel): boolean {
    return ConsoleLogger.severity[a] >= ConsoleLogger.severity[b];
  }
}
