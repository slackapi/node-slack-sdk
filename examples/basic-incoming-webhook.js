/**
 * Example for using an Incoming Webhook
 */

const { IncomingWebhook } = require('@slack/client');

// Get a URL by creating an app at <https://api.slack.com/apps?new_app=1>, and configuring an Incoming Webhook
// It's always a good idea to keep sensitive data like the url outside your source code. Prefer environment variables.
const url = process.env.SLACK_WEBHOOK_URL || '';
if (!url) { console.log('You must specify a token to use this example'); process.exitCode = 1; return; }

// Initialize a Incoming Webhook
const webhook = new IncomingWebhook(url);

// Send a message
webhook.send({
  text: 'Hello, world!',
  // the following properties are optional
  username: 'My custom username',
  icon_emoji: ':slack:',
}, (error, response) => {
  if (error) {
    // Error :/
    return console.error(error);
  }
  // Success!
  console.log(response);
})
