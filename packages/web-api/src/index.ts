/// <reference lib="es2017" />

export {
  WebClient,
  WebClientOptions,
  WebAPICallOptions,
  WebAPICallResult,
  PaginatePredicate,
  WebClientEvent,
  TLSOptions,
} from './WebClient';

export { Logger, LogLevel } from './logger';

export {
  ErrorCode,
  WebAPICallError,
  WebAPIPlatformError,
  WebAPIRequestError,
  WebAPIHTTPError,
  WebAPIRateLimitedError,
} from './errors';

export { default as retryPolicies, RetryOptions } from './retry-policies';

export { addAppMetadata } from './instrument';

export * from './methods';
