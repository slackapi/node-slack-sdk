/// <reference lib="es2017" />

export { SocketModeClient } from './SocketModeClient';
export { SocketModeOptions } from './SocketModeOptions';
export { UnrecoverableSocketModeStartError } from './UnrecoverableSocketModeStartError';

export { Logger, LogLevel } from './logger';

export {
  ErrorCode,
  SMPlatformError,
  SMWebsocketError,
  SMNoReplyReceivedError,
  SMSendWhileDisconnectedError,
  SMSendWhileNotReadyError,
  SMCallError,
} from './errors';
