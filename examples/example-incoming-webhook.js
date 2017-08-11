/**
 * Example for using Incoming Webhooks
 */

/* eslint no-console:0 */

// Set up a webhook at https://slack.com/apps/manage/A0F7XDUAZ-incoming-webhooks

var IncomingWebhook = require('@slack/client').IncomingWebhook;

var url = process.env.SLACK_WEBHOOK_URL || '';
var wh = new IncomingWebhook(url);
var whWithDefaults = new IncomingWebhook(url, {
  username: 'My custom username',
  iconEmoji: ':slack:',
  channel: 'my-custom-channel'
});

wh.send('Some text');

whWithDefaults.send({
  text: 'Some text',
  iconEmoji: ':robot_face:',
  channel: 'custom-channel',
  linkNames: '1',
  attachments: [
    // attachment data
    // see https://api.slack.com/docs/attachments
  ]
});

wh.send('Some text', function onSendEnd() {
  console.log('Finished sending');
});
