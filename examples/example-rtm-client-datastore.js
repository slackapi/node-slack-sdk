var RtmClient       = require('@slack/client').RtmClient,
    
    CLIENT_EVENTS   = require('@slack/client').CLIENT_EVENTS,
    RTM_EVENTS      = require('@slack/client').RTM_EVENTS,
    
    MemoryDataStore = require('@slack/client').MemoryDataStore;

var token = process.env.SLACK_API_TOKEN || '';

var rtm = new RtmClient(token, { 
    logLevel: 'info', // check this out for more on logger: https://github.com/winstonjs/winston
    dataStore: new MemoryDataStore({}) // pass on a new instance of MemoryDataStore type to cache information
});

rtm.start();

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
    console.log('RTM client authenticated!');
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  console.log('User %s posted a message in %s channel', rtm.dataStore.getUserById(message.user).name, rtm.dataStore.getChannelGroupOrDMById(message.channel).name);
});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
  console.log('Reaction added:', reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved(reaction) {
  console.log('Reaction removed:', reaction);
});