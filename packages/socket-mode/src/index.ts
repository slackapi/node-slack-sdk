/// <reference lib="es2017" />

export {
  ErrorCode,
  SlackSocketModeError,
  SMCallError,
  SMNoReplyReceivedError,
  SMPlatformError,
  SMPlatformErrorEvent,
  SMSendWhileDisconnectedError,
  SMSendWhileNotReadyError,
  SMWebsocketError,
} from './errors';

export { Logger, LogLevel } from './logger';
export { SocketModeClient } from './SocketModeClient';
export { SocketModeDispatcher, SocketModeOptions } from './SocketModeOptions';
export { UnrecoverableSocketModeStartError } from './UnrecoverableSocketModeStartError';
