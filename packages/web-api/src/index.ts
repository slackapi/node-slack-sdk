/// <reference lib="es2017" />

export {
  CodedError,
  ErrorCode,
  WebAPICallError,
  WebAPIHTTPError,
  WebAPIPlatformError,
  WebAPIRateLimitedError,
  WebAPIRequestError,
} from './errors';

export { addAppMetadata } from './instrument';

export { Logger, LogLevel } from './logger';

export { default as retryPolicies, RetryOptions } from './retry-policies';

export * from './types/request/index';
export * from './types/response/index';

export {
  PageAccumulator,
  PageReducer,
  PaginatePredicate,
  TLSOptions,
  WebAPICallResult,
  WebClient,
  WebClientEvent,
  WebClientOptions,
} from './WebClient';

// methods must be exported after WebClient
export * from './methods';
export { default as Method } from './methods';
