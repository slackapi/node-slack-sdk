import events = require('./lib/clients/events'); // tslint:disable-line:no-require-imports
import RETRY_POLICIES = require('./lib/clients/retry-policies'); // tslint:disable-line:no-require-imports import-name
import WebClient = require('./lib/clients/web/client'); // tslint:disable-line:no-require-imports import-name
import RtmClient = require('./lib/clients/rtm/client'); // tslint:disable-line:no-require-imports import-name
// tslint:disable-next-line:no-require-imports import-name
import IncomingWebhook = require('./lib/clients/incoming-webhook/client');
// tslint:disable-next-line:no-require-imports import-name
import LegacyRtmClient = require('./lib/clients/default/legacy-rtm');
// tslint:disable-next-line:no-require-imports import-name
import MemoryDataStore = require('./lib/data-store/memory-data-store');
import { requestOptionsTransport } from './lib/clients/transports/request';

// SEMVER:MAJOR retry policies are now a top-level export
export { default as retryPolicies } from './lib/clients/retry-policies';

// SEMVER:MAJOR one global logging function instead of used in instances
export { LoggingFunc, replaceLogging, LogLevel } from './lib/logger';

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
