/// <reference lib="es2017" />

export {
  WebClient,
  WebClientOptions,
  WebAPICallOptions,
  WebAPICallResult,
  PageAccumulator,
  PageReducer,
  PaginatePredicate,
  WebClientEvent,
  TLSOptions,
} from './WebClient';

export { Logger, LogLevel } from './logger';

export {
  CodedError,
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
export { default as Method } from './methods';

export * from './response';
