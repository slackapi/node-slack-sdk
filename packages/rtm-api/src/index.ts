/// <reference lib="es2017" />

export {
  RTMCallResult,
  RTMClient,
  RTMClientOptions,
  RTMStartOptions,
} from './RTMClient';

// Utilities

export {
  CodedError,
  ErrorCode,
  RTMCallError,
  RTMNoReplyReceivedError,
  RTMPlatformError,
  RTMSendWhileDisconnectedError,
  RTMSendWhileNotReadyError,
  RTMWebsocketError,
} from './errors';

export { Logger, LogLevel } from './logger';
