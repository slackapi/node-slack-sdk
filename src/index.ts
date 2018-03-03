import events = require('./clients/events'); // tslint:disable-line:no-require-imports
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
} from './util';

// SEMVER:MAJOR no more proxiedRequestTransport or requestOptionsTransport
// in order to do proxying, use the WebClient and RTMClient 'agent' options and one of the following packages:
// * https://github.com/koichik/node-tunnel
// * https://github.com/TooTallNate/node-https-proxy-agent

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
} from './RTMClient';

const CLIENT_EVENTS = {
  WEB: events.CLIENT_EVENTS.WEB,
  RTM: events.CLIENT_EVENTS.RTM,
};

const { RTM_EVENTS, RTM_MESSAGE_SUBTYPES } = events;

export {
  // IncomingWebhook,
  CLIENT_EVENTS,
  RTM_EVENTS,
  RTM_MESSAGE_SUBTYPES,
};
