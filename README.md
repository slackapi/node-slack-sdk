# Node Library for the Slack APIs

[![Build Status](https://travis-ci.org/slackhq/node-slack-client.svg?branch=master)](https://travis-ci.org/slackhq/node-slack-client)
[![Coverage Status](https://coveralls.io/repos/github/slackhq/node-slack-client/badge.svg?branch=master)](https://coveralls.io/github/slackhq/node-slack-client?branch=master)

## Motivation

This is a wrapper around the Slack [RTM](https://api.slack.com/rtm) and [Web](https://api.slack.com/web) APIs.

This library will provide the low level functionality you need to build reliable apps and projects on top of Slack's APIs. It:
- handles reconnection logic and request retries
- provides reasonable defaults for events and logging
- defines a basic model layer and data-store for caching Slack RTM API responses

This library does not attempt to provide application level support, e.g. regex matching and filtering of the conversation stream. If you're looking for those kinds of features, you should check out one of the great libraries built on top of this.

## Installation

```bashp
npm install @slack/client --save
```

## Package name change!!

**IMPORTANT** We're moving to NPM organizations, so going forwards the client will be published as a scoped module under the Slack organization.

We'll dual-publish both `@slack/client` and `slack-client` until at least `2.1.0` is released, and possibly past that, but please switch over before then.

## Usage

* [RTM Client](#rtm-client)
  * [Creating an RTM client](#creating-an-rtm-client)
  * [Listen to messages](#listen-to-messsages)
  * [Send messages](#send-messages)
  * [RTM Client Lifecycle](#rtm-client-lifecycle)
* [Migrating from earlier versions](#migrating-from-earlier-versions) 
  * [Models](#models)

## RTM Client

The [Real Time Messaging client](lib/clients/rtm) connects to [Slack's RTM API](https://api.slack.com/rtm) over a websocket.

It allows you to listen for activity in the Slack team you've connected to and push simple messages back to that team over the websocket.

### Creating an RTM client

```js

var RtmClient = require('slack-client').RtmClient;

var token = process.env.SLACK_API_TOKEN || '';

var rtm = new RtmClient(token, {logLevel: 'debug'});
rtm.start();

```

### Capturing the `rtm.start` payload

The RTM client will emit a `RTM.AUTHENTICATED` event, with the `rtm.start` payload.

```js

var CLIENT_EVENTS = require('slack-client').CLIENT_EVENTS;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {

});


```

### Listen to messages

```js

var RTM_EVENTS = require('slack-client').RTM_EVENTS;

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
  // Listens to all `message` events from the team
});

rtm.on(RTM_EVENTS.CHANNEL_CREATED, function (message) {
  // Listens to all `channel_created` events from the team
});

```

### Send messages

```js

var RTM_CLIENT_EVENTS = require('slack-client').CLIENT_EVENTS.RTM;

// you need to wait for the client to fully connect before you can send messages
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
  // This will send the message 'this is a test message' to the channel identified by id 'C0CHZA86Q'
  rtm.sendMessage('this is a test message', 'C0CHZA86Q', function messageSent() {
    // optionally, you can supply a callback to execute once the message has been sent
  });
});

```

### RTM Client Lifecyle

The RTM client has its own lifecycle events. These reflect the different states the RTM client can be in as it connects to Slack's RTM API.

The full details of the client lifecyle are in the [RTM client events file](/lib/clients/events/client.js)

The most important events are:
- `RTM_CONNECTION_OPENED`: the remote server has acked the socket and sent a `hello` message, the connection is now live and can be used to send messages
- `DISCONNECT`: the RTM client has disconnected and will not try to reconnect again automatically

## Migrating from earlier versions

This is an incomplete list of items to consider when you migrate from earlier versions. As issues and PRs are raised for things that don't work as expected we'll fill this out.

### Models

The model objects no longer provide utility functions for working with the API. This is to decouple them from the client implementation. There should be functions on each of the clients that allow you to take the same actions you took from the model via the clients instead. The most common of these are below.

#### Sending a message

```js

channel.sendMessage('test message');

```

becomes

```js

rtmClient.sendMessage('test message', channel.id);

```

#### Posting a message

```js

channel.postMessage({
  attachments: [...]
});

```

becomes

```js

var data = {
  attachments: [...]
};
webClient.chat.postMessage(channelId, 'test message', data, function() {});

```

## Copyright

Copyright &copy; Slack Technologies, Inc. MIT License; see LICENSE for further details.
