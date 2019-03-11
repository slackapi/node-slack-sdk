/// <reference lib="es2017" />

export {
  Logger,
  LogLevel,
} from './logger';

export {
  CodedError,
  ErrorCode,
} from './errors';

export {
  addAppMetadata,
  AgentOption,
  TLSOptions,
} from './util';

export {
  default as retryPolicies,
  RetryOptions,
} from './retry-policies';

export {
  WebClient,
  WebClientOptions,
  WebAPICallOptions,
  WebAPICallResult,
  WebAPIPlatformError,
  WebAPIRequestError,
  WebAPIReadError, // NOTE: this is no longer used, but might once again be used if a more specific means to detect it
                   // becomes evident
  WebAPIHTTPError,
  WebAPIRateLimitedError,
  WebAPICallError,
} from './WebClient';

export * from './methods';

export {
  RTMClient,
  RTMClientOptions,
  RTMStartOptions,
  RTMCallResult,
  RTMPlatformError,
  RTMWebsocketError,
  RTMCallError,
} from './RTMClient';

export {
  IncomingWebhook,
  IncomingWebhookSendArguments,
  IncomingWebhookDefaultArguments,
  IncomingWebhookResult,
  IncomingWebhookRequestError,
  IncomingWebhookReadError, // NOTE: this is no longer used.
  IncomingWebhookHTTPError,
  IncomingWebhookSendError,
} from './IncomingWebhook';
