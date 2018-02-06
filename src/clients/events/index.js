module.exports = {
  CLIENT_EVENTS: {
    WEB: require('./client').WEB,
    RTM: require('./client').RTM
  },
  RTM_EVENTS: require('./rtm').EVENTS,
  RTM_MESSAGE_SUBTYPES: require('./rtm').MESSAGE_SUBTYPES
};
