import events = require('./clients/events'); // tslint:disable-line:no-require-imports
import WebClient = require('./clients/web/client'); // tslint:disable-line:no-require-imports import-name
import RtmClient = require('./clients/rtm/client'); // tslint:disable-line:no-require-imports import-name
// tslint:disable-next-line:no-require-imports import-name
import IncomingWebhook = require('./clients/incoming-webhook/client');
// tslint:disable-next-line:no-require-imports import-name
import MemoryDataStore = require('./data-store/memory-data-store');
import { requestOptionsTransport } from './clients/transports/request';

// SEMVER:MAJOR retry policies are now a top-level export
export { default as retryPolicies, RetryOptions } from './clients/retry-policies';

// SEMVER:MAJOR one global logging function instead of used in instances
export { LoggingFunc, LogLevel } from './logger';

export { CodedError, ErrorCode } from './errors';

const CLIENT_EVENTS = {
  WEB: events.CLIENT_EVENTS.WEB,
  RTM: events.CLIENT_EVENTS.RTM,
};

const { RTM_EVENTS, RTM_MESSAGE_SUBTYPES } = events;

export {
  WebClient,
  RtmClient,
  IncomingWebhook,
  LegacyRtmClient,
  MemoryDataStore,
  requestOptionsTransport,
  CLIENT_EVENTS,
  RTM_EVENTS,
  RTM_MESSAGE_SUBTYPES,
  RETRY_POLICIES,
};
