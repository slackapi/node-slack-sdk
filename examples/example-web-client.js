/**
 * Example for creating and working with the Slack Web API.
 */

var WebClient = require('../lib/clients/web/client');

var token = process.env.SLACK_API_TOKEN || '';
var web = new WebClient(token);

web.team.info(function (err, channels) {
  if (err) return console.log('Error:', err);
  console.log('Team Info:', channels);
});
