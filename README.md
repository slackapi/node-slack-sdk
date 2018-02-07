# Node Slack SDK

[![Build Status](https://travis-ci.org/slackapi/node-slack-sdk.svg?branch=master)](https://travis-ci.org/slackapi/node-slack-sdk)
[![codecov](https://codecov.io/gh/slackapi/node-slack-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/slackapi/node-slack-sdk)
[![npm (scoped)](https://img.shields.io/npm/v/@slack/client.svg)](https://www.npmjs.com/package/@slack/client)

Visit the [full documentation](https://slackapi.github.io/node-slack-sdk) for all the lovely details.

So you want to build a Slack app with Node.js? We've got you covered. This package is aimed at making
building Slack apps ridiculously easy. This package will help you build on all aspects of the Slack platform,
from dropping notifications in channels to fully interactive bots.

## Requirements

This package supports node starting from major **version 0.12 and later**. It's highly recommended
to use [the latest LTS version of node](https://github.com/nodejs/Release#release-schedule), and the
documentation is written using syntax and features from that version.

## Installation

Use npm to install the package and save it to your `package.json`:

```shell
$ npm install @slack/client
```

## Features

The Slack platform offers several APIs to build apps. Each API delivers part of the capabilities
from the platform, with a range of complexity and functionality, so that you can pick the one that
fits for your app.

| Slack API    | Outgoing | Incoming | NPM Package         | Documentation     |
|--------------|:--------:|:--------:|---------------------|-------------------|
| Web API      | ⬆️        | ⬜️       | `@slack/client`     | [Guide](https://slackapi.github.io/node-slack-sdk/web_api) |
| RTM API      | ⬆️        | ⬇️        | `@slack/client`     | [Guide](https://slackapi.github.io/node-slack-sdk/rtm_api) |
| Incoming Webhooks | ⬆️   | ⬜️       | `@slack/client`     | [Guide](https://slackapi.github.io/node-slack-sdk/incoming_webhook) |
| Events API   | ⬜️       | ⬇️        | `@slack/events-api` | [README](https://github.com/slackapi/node-slack-events-api) |
| Interactive Messages | ⬜️ | ⬇️      | `@slack/interactive-messages` | [README](https://github.com/slackapi/node-slack-interactive-messages) |

**Just starting out?** We suggest starting at the
[Getting Started guide](https://slackapi.github.io/node-slack-sdk/getting_started) which will walk you
through building your first Slack app using Node.js.

**Not sure about which APIs are right for your app?** Read our
[helpful blog post](https://medium.com/slack-developer-blog/getting-started-with-slacks-apis-f930c73fc889)
that explains and compares the options. If you're still not sure,
[reach out for help](#getting-help) and our community can guide you.

## Examples

### Posting a message with Web API

Your app will interact with the Web API through the `WebClient` object, which a top level export
from this package. At a minimum, you need to instantiate it with a token. The example below shows
how to post a message into a channel, DM, MPDM, or group. This will require either the
`chat:user:write` or `chat:bot:write` scopes.

```javascript
const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// The first argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const channelId = 'C1232456';

// See: https://api.slack.com/methods/chat.postMessage
web.chat.postMessage(channelId, 'Hello there')
  .then((res) => {
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);
```

The `WebClient` object makes it simple to call any of the
[**over 130 Web API methods**](https://api.slack.com/methods). See the
[guide](http://slackapi.github.io/node-slack-sdk/web_api) for details.

### Posting a message with the Real-Time Messaging API

Your app will interact with the RTM API through the `RtmClient` object, which is a top level
export from this package. At a minimum, you need to instantiate it with a token, usually a
bot token.

```javascript
const { RtmClient, CLIENT_EVENTS } = require('@slack/client');

// An access token (from your Slack app or custom integration - usually xoxb)
const token = process.env.SLACK_TOKEN;

// Cache of data
const appData = {};

// Initialize the RTM client with the recommended settings. Using the defaults for these
// settings is deprecated.
const rtm = new RtmClient(token, {
  dataStore: false,
  useRtmConnect: true,
});

// The client will emit an RTM.AUTHENTICATED event on when the connection data is avaiable
// (before the connection is open)
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (connectData) => {
  // Cache the data necessary for this app in memory
  appData.selfId = connectData.self.id;
  console.log(`Logged in as ${appData.selfId} of team ${connectData.team.id}`);
});

// The client will emit an RTM.RTM_CONNECTION_OPENED the connection is ready for
// sending and recieving messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
  console.log(`Ready`);
});

// Start the connecting process
rtm.start();
```

The `RtmClient` object makes it simple to listen for [events](https://api.slack.com/rtm#events) from
and send simple messages to a workspace. See the
[guide](http://slackapi.github.io/node-slack-sdk/rtm_api) for details.

## Posting a message with Incoming Webhooks

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

## Getting Help

If you get stuck, we're here to help. The following are the best ways to get assistance working through your issue:

  * [Issue Tracker](http://github.com/slackapi/node-slack-sdk/issues) for questions, feature
    requests, bug reports and general discussion related to this package.
  * [Email us](mailto:developers@slack.com) in Slack developer support: `developers@slack.com`
  * [Bot Developers Hangout](https://community.botkit.ai/): a Slack community for developers
    building all types of bots. You can find the maintainers and users of this package in **#sdk-node-slack-sdk**.
