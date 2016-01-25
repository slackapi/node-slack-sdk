module.exports = {
  WebClient: require('./lib/clients/web/client'),
  RtmClient: require('./lib/clients/rtm/client'),
  LegacyRtmClient: require('./lib/clients/default/legacy-rtm'),
  EVENTS: require('./lib/clients/events'),
  MemoryDataStore: require('./lib/data-store/memory-data-store'),
};
