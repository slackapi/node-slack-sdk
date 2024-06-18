import { Logger, createLogger, format, transports } from 'winston';

// Configure CLI log level
// Winston logging levels, see: https://github.com/winstonjs/winston#logging
const loggerLevel = process.env.SLACK_CLI_LOG_LEVEL || 'info';

// Create custom logging format
const logPrintFormat = format.printf(
  ({ level, message, label, timestamp }) => `${timestamp} - [${label}] - ${level}: ${message}`,
);

// Create logger
const logger: Logger = createLogger({
  level: loggerLevel,
  format: format.combine(
    format.label({ label: 'Slack CLI' }),
    format.timestamp(),
    format.colorize(),
    logPrintFormat,
  ),
  transports: [new transports.Console()],
});

export default logger;
