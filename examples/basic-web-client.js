/**
 * Example for using the Slack Web API.
 */

const { WebClient } = require('@slack/client');

// Get an API token by creating an app at <https://api.slack.com/apps?new_app=1>
// It's always a good idea to keep sensitive data like the token outside your source code. Prefer environment variables.
const token = process.env.SLACK_API_TOKEN || '';
if (!token) { console.log('You must specify a token to use this example'); process.exitCode = 1; return; }

// Initialize a Web API client
const web = new WebClient(token);

// Call a Web API method (in this case, `team.info`)
// Your token should have `team:read` scope (or `bot` scope, which includes `team:read`)
web.team.info()
  .then((response) => {
    // Success!
    console.log('Team info response:');
    console.log(response);
  })
  .catch((error) => {
    // Error :/
    console.log('Team info error:');
    console.log(error);
  });
