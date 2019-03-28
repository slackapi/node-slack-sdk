
/// <reference lib="es2017" />

export {
  RTMClient,
  RTMClientOptions,
  RTMStartOptions,
  RTMCallResult,
} from './RTMClient';

export { Logger, LogLevel } from './logger';

export {
  ErrorCode,
  RTMPlatformError,
  RTMWebsocketError,
  RTMNoReplyReceivedError,
  RTMSendWhileDisconnectedError,
  RTMSendWhileNotReadyError,
  RTMCallError,
} from './errors';
