var events = require('./lib/clients/events');

module.exports = {
  WebClient: require('./lib/clients/web/client'),
  RtmClient: require('./lib/clients/rtm/client'),
  LegacyRtmClient: require('./lib/clients/default/legacy-rtm'),
  CLIENT_EVENTS: {
    WEB: events.CLIENT_EVENTS.WEB,
    RTM: events.CLIENT_EVENTS.RTM,
  },
  RTM_EVENTS: events.RTM_EVENTS,
  RTM_MESSAGE_SUBTYPES: events.RTM_MESSAGE_SUBTYPES,
  MemoryDataStore: require('./lib/data-store/memory-data-store'),
};
