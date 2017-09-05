# Node Library for the Slack APIs

[![Build Status](https://travis-ci.org/slackapi/node-slack-sdk.svg?branch=master)](https://travis-ci.org/slackapi/node-slack-sdk)
[![codecov](https://codecov.io/gh/slackapi/node-slack-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/slackapi/node-slack-sdk)
[![npm (scoped)](https://img.shields.io/npm/v/@slack/client.svg?maxAge=2592000)](https://www.npmjs.com/package/@slack/client)


Read the [full documentation](https://slackapi.github.io/node-slack-sdk) for all the lovely details.

This module is a wrapper around the Slack [RTM](https://api.slack.com/rtm) and [Web](https://api.slack.com/web) APIs. 

It will help you build on the Slack platform, from dropping notifications in channels to developing fully interactive bots. It provides the low level functionality you need to build reliable apps and projects on top of Slack's APIs.
It:

 - handles reconnection logic and request retries
 - provides reasonable defaults for events and logging
 - defines a basic model layer and data-store for caching Slack RTM API responses

This module does not attempt to provide application level support, _e.g._ regex matching and filtering of the
conversation stream.

Most Slack apps are interested in posting messages into Slack channels, and generally working with our [Web API](https://api.slack.com/web). Read on
to learn how to use `node-slack-sdk` to accomplish these tasks. Bots, on the other hand, are a bit more complex,
so we have them covered in [Building Bots](https://slackapi.github.io/node-slack-sdk/bots).

# Installation
Once you have a working Node.js project, you can install the Slack Developer Kit as a dependency via npm:

```sh
$ npm install @slack/client --save
```

# Some Examples

All of these examples assume that you have set up a Slack [app](https://api.slack.com/slack-apps) or
[custom integration](https://api.slack.com/custom-integrations), and understand the basic mechanics of working with the
Slack Platform.

## Posting a message with Incoming Webhooks

[Incoming webhooks](https://api.slack.com/incoming-webhooks) are an easy way to get notifications posted into Slack with
a minimum of setup. You'll need to either have a custom incoming webhook set up, or an app with an incoming webhook
added to it.

```js
var IncomingWebhook = require('@slack/client').IncomingWebhook;

var url = process.env.SLACK_WEBHOOK_URL || '';

var webhook = new IncomingWebhook(url);

webhook.send('Hello there', function(err, header, statusCode, body) {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Received', statusCode, 'from Slack');
  }
});
```

## Posting a message with Web API

You'll need a Web API token to call any of the Slack Web API methods. For custom integrations, you'll get this
[from the token generator](https://api.slack.com/docs/oauth-test-tokens), and for apps it will come as the final part
of the [OAuth dance](https://api.slack.com/docs/oauth).

Your app will interact with the Web API through the `WebClient` object, which requires an access token to operate.

```js
var WebClient = require('@slack/client').WebClient;

var token = process.env.SLACK_API_TOKEN || '';

var web = new WebClient(token);
web.chat.postMessage('C1232456', 'Hello there', function(err, res) {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Message sent: ', res);
  }
});
```

## Posting a message with the Real-Time Messaging API

Starting a bot up requires a bot token (bot tokens start with `xoxb-`),
which can be had either creating a [custom bot](https://my.slack.com/apps/A0F7YS25R-bots) or by creating an app with a
bot user, at the end of the [OAuth dance](https://api.slack.com/docs/oauth). If you aren't sure path is right for you,
have a look at the [Bot Users documentation](https://api.slack.com/bot-users).

```js
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var bot_token = process.env.SLACK_BOT_TOKEN || '';

var rtm = new RtmClient(bot_token);

let channel;

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for (const c of rtmStartData.channels) {
	  if (c.is_member && c.name ==='general') { channel = c.id }
  }
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});

// you need to wait for the client to fully connect before you can send messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  rtm.sendMessage("Hello!", channel);
});

rtm.start();
```
