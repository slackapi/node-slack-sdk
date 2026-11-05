import { ConsoleLogger, type Logger, type LogLevel } from '@slack/logger';

export { Logger, LogLevel } from '@slack/logger';

export function getLogger(name: string, level: LogLevel, existingLogger?: Logger): Logger {
  const logger: Logger = existingLogger ?? new ConsoleLogger();
  logger.setName(name);
  logger.setLevel(level);
  return logger;
}
