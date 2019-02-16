# Node Slack SDK

[![Build Status](https://travis-ci.org/slackapi/node-slack-sdk.svg?branch=master)](https://travis-ci.org/slackapi/node-slack-sdk)
[![codecov](https://codecov.io/gh/slackapi/node-slack-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/slackapi/node-slack-sdk)
[![npm (scoped)](https://img.shields.io/npm/v/@slack/client.svg)](https://www.npmjs.com/package/@slack/client)

Visit the [full documentation](https://slackapi.github.io/node-slack-sdk) for all the lovely details.

So you want to build a Slack app with Node.js? We've got you covered. This package is aimed at making building Slack
apps ridiculously easy. It helps you build on all aspects of the Slack platform, from dropping notifications in channels
to fully interactive bots.

## Installation

Use npm to install the package and save it to your `package.json`:

```shell
$ npm install @slack/client
```

## Features

The Slack platform offers several APIs to build apps. Each API delivers part of the capabilities from the platform, with
a range of complexity and functionality, so that you can pick the one that fits for your app.

| Slack API    | Outgoing | Incoming | NPM Package         | Documentation     |
|--------------|:--------:|:--------:|---------------------|-------------------|
| Web API      | ⬆️        | ⬜️       | `@slack/client`     | [Guide](https://slackapi.github.io/node-slack-sdk/web_api) |
| RTM API      | ⬆️        | ⬇️        | `@slack/client`     | [Guide](https://slackapi.github.io/node-slack-sdk/rtm_api) |
| Incoming Webhooks | ⬆️   | ⬜️       | `@slack/client`     | [Guide](https://slackapi.github.io/node-slack-sdk/incoming_webhook) |
| Events API   | ⬜️       | ⬇️        | `@slack/events-api` | [README](https://github.com/slackapi/node-slack-events-api) |
| Interactive Messages | ⬜️ | ⬇️      | `@slack/interactive-messages` | [README](https://github.com/slackapi/node-slack-interactive-messages) |

**Just starting out?** The [Getting Started guide](https://slackapi.github.io/node-slack-sdk/getting_started) will walk
you through building your first Slack app using Node.js.

**Not sure about which APIs are right for your app?** Read our [helpful blog
post](https://medium.com/slack-developer-blog/getting-started-with-slacks-apis-f930c73fc889) that explains and compares
the options. If you're still not sure, [reach out for help](#getting-help) and our community can guide you.

## Examples

### Posting a message with Web API

Your app will interact with the Web API through the `WebClient` object, which a top level export from this package. You
need to instantiate it with a token. The example below shows how to post a message into a channel, DM, MPDM, or group.
This will require either the `bot`, `chat:user:write` or `chat:bot:write` scopes.

```javascript
const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'C1232456';

(async () => {
  // See: https://api.slack.com/methods/chat.postMessage
  const res = await web.chat.postMessage({ channel: conversationId, text: 'Hello there' });

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
})();
```

The `WebClient` object makes it simple to call any of the [**over 130 Web API methods**](https://api.slack.com/methods).
See the [guide](http://slackapi.github.io/node-slack-sdk/web_api) for details.

### Using the Real-Time Messaging API

Your app will interact with the RTM API through the `RTMClient` object, which is another top level export from this
package. You need to instantiate it with a token, usually a bot token.

```javascript
const { RTMClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - usually xoxb)
const token = process.env.SLACK_TOKEN;

// The client is initialized and then started to get an active connection to the platform
const rtm = new RTMClient(token);
rtm.start();

// Calling `rtm.on(eventName, eventHandler)` allows you to handle events
// When the connection is active, the 'ready' event will be triggered
rtm.on('ready', async () => {

  // Once the connection is open, your app will start receiving other events. It can also send messages.

  // Sending a message requires a channel ID, a DM ID, an MPDM ID, or a group ID
  // The following value is used as an example
  const conversationId = 'C1232456';

  // The RTM client can send simple string messages
  const res = await rtm.sendMessage('Hello there', conversationId);

  // `res` contains information about the sent message
  console.log('Message sent: ', res.ts);
});
```

See the [guide](http://slackapi.github.io/node-slack-sdk/rtm_api) for more details.

### Posting a message with Incoming Webhooks

[Incoming webhooks](https://api.slack.com/incoming-webhooks) are an easy way to send notifications
to a Slack channel with a minimum of setup. You'll need a webhook URL from a Slack app or a custom
integration to use the `IncomingWebhook` class.

```javascript
const { IncomingWebhook } = require('@slack/client');
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

// Send simple text to the webhook channel
webhook.send('Hello there', function(err, res) {
    if (err) {
        console.log('Error:', err);
    } else {
        console.log('Message sent: ', res);
    }
});
```

## Requirements

This package supports Node v6 LTS and higher. It's highly recommended to use [the latest LTS version of
node](https://github.com/nodejs/Release#release-schedule), and the documentation is written using syntax and features
from that version.

## Getting Help

If you get stuck, we're here to help. The following are the best ways to get assistance working through your issue:

  * [Issue Tracker](http://github.com/slackapi/node-slack-sdk/issues) for questions, feature
    requests, bug reports and general discussion related to this package.
  * [Email us](mailto:developers@slack.com) in Slack developer support: `developers@slack.com`
  * [Bot Developers Hangout](https://community.botkit.ai/): a Slack community for developers
    building all types of bots. You can find the maintainers and users of this package in **#sdk-node-slack-sdk**.
