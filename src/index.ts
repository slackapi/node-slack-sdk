// import events = require('./clients/events'); // tslint:disable-line:no-require-imports
// tslint:disable-next-line:no-require-imports import-name
// import IncomingWebhook = require('./clients/incoming-webhook/client');

export {
  LoggingFunc,
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

// SEMVER:MAJOR retry policies are now a top-level export
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
  WebAPIReadError,
  WebAPIHTTPError,
  WebAPICallError,
  WebAPIResultCallback,
} from './WebClient';

export {
  RTMClient,
  RTMClientOptions,
  RTMCallResult,
  RTMPlatformError,
  RTMWebsocketError,
  RTMCallError,
  RTMCallResultCallback,
} from './RTMClient';

// const CLIENT_EVENTS = {
//   WEB: events.CLIENT_EVENTS.WEB,
//   RTM: events.CLIENT_EVENTS.RTM,
// };

// const { RTM_EVENTS, RTM_MESSAGE_SUBTYPES } = events;

// export {
  // IncomingWebhook,
  // CLIENT_EVENTS,
  // RTM_EVENTS,
  // RTM_MESSAGE_SUBTYPES,
// };
