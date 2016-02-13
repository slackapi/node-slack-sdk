/**
 * Example for creating and working with the Slack Web API.
 */

/* eslint no-console:0 */

var WebClient = require('../lib/clients/web/client');

var token = process.env.SLACK_API_TOKEN || '';
var web = new WebClient(token);

web.team.info(function teamInfoCb(err, info) {
  if (err) return console.log('Error:', err);
  console.log('Team Info:', info);
});
