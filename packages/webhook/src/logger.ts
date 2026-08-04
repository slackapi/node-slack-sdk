import { ConsoleLogger, type Logger, type LogLevel } from '@slack/logger';

export { Logger, LogLevel } from '@slack/logger';

let instanceCount = 0;

export function getLogger(name: string, level: LogLevel, existingLogger?: Logger): Logger {
  const instanceId = instanceCount;
  instanceCount += 1;

  const logger: Logger = existingLogger ?? new ConsoleLogger();
  logger.setName(`webhook:${name}:${instanceId}`);
  if (level !== undefined) {
    logger.setLevel(level);
  }

  return logger;
}
