import events = require('./clients/events'); // tslint:disable-line:no-require-imports
import RtmClient = require('./clients/rtm/client'); // tslint:disable-line:no-require-imports import-name
// tslint:disable-next-line:no-require-imports import-name
import IncomingWebhook = require('./clients/incoming-webhook/client');
import { requestOptionsTransport } from './clients/transports/request';

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

// SEMVER:MAJOR retry policies are now a top-level export
export {
  default as retryPolicies,
  RetryOptions,
} from './clients/retry-policies';

export {
  WebClient,
  WebClientOptions,
  WebAPICallOptions,
  WebAPICallResult,
  WebAPIResultCallback,
} from './clients/WebClient';

const CLIENT_EVENTS = {
  WEB: events.CLIENT_EVENTS.WEB,
  RTM: events.CLIENT_EVENTS.RTM,
};

const { RTM_EVENTS, RTM_MESSAGE_SUBTYPES } = events;

export {
  RtmClient,
  IncomingWebhook,
  MemoryDataStore,
  requestOptionsTransport,
  CLIENT_EVENTS,
  RTM_EVENTS,
  RTM_MESSAGE_SUBTYPES,
};
