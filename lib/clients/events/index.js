module.exports = {
  CLIENT: {
    WEB: require('./client').WEB,
    RTM: require('./client').RTM,
  },
  API: {
    EVENTS: require('./rtm').EVENTS,
    MESSAGE_SUBTYPES: require('./rtm').MESSAGE_SUBTYPES,
  },
};
