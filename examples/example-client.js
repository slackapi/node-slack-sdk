/**
 * Example for creating and working with the Slack RTM API.
 */

var RtmClient = require('../lib/clients/rtm/client');

var token = '' || process.env.SLACK_API_TOKEN;

var rtm = new RtmClient(token, {logLevel: 'debug'});
rtm.start();

rtm.on('message', function (message) {
  console.log(message);
});
