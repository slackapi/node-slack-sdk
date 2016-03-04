/**
 * Example for creating and working with the Slack RTM API.
 */

/* eslint no-console:0 */

var RtmClient = require('../lib/clients/rtm/client');

var token = process.env.SLACK_API_TOKEN || '';

var rtm = new RtmClient(token, { logLevel: 'debug' });
rtm.start();

rtm.on('message', function handleRtmMessage(message) {
  console.log(message);
});

rtm.on('reaction_added', function handleRtmReactionAdded(reaction) {
  console.log(reaction);
});

rtm.on('reaction_removed', function handleRtmReactionRemoved(reaction) {
  console.log(reaction);
});
