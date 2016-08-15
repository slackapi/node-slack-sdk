# Node Library for the Slack APIs

[![Build Status](https://travis-ci.org/slackhq/node-slack-sdk.svg?branch=master)](https://travis-ci.org/slackhq/node-slack-sdk)
[![Coverage Status](https://coveralls.io/repos/github/slackhq/node-slack-sdk/badge.svg?branch=master)](https://coveralls.io/github/slackhq/node-slack-sdk?branch=master)

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

## Usage
* [Examples](#examples)
* [RTM Client](#rtm-client)
  * [Creating an RTM client](#creating-an-rtm-client)
  * [Listen to messages](#listen-to-messages)
  * [Send messages](#send-messages)
  * [Update messages](#update-messages)
  * [Data stores] (#data-stores)
  * [Send direct messages] (#send-direct-messages)
  * [RTM Client Lifecycle](#rtm-client-lifecycle)
* [Web Client](#web-client)
  * [Uploading a file](#uploading-a-file)
* [Incoming Webhook](#incoming-webhook)
* [Migrating from earlier versions](#migrating-from-earlier-versions)
* [Models](#models)

## Examples

There are some examples for using this package in the [examples directory](/examples), these include:
* [connecting to the RTM API](/examples/example-rtm-client.js)
* [connecting to the RTM API and using a datastore](/examples/example-rtm-client-datastore.js)
* [using the web client](/examples/example-web-client.js)
* [uploading a file via the web client](/examples/upload-a-file.js)
* [using incoming webhooks](/examples/example-incoming-webhook.js)

## RTM Client

The [Real Time Messaging client](lib/clients/rtm) connects to [Slack's RTM API](https://api.slack.com/rtm) over a websocket.

It allows you to listen for activity in the Slack team you've connected to and push simple messages back to that team over the websocket.

### Creating an RTM client

```js

var RtmClient = require('@slack/client').RtmClient;

var token = process.env.SLACK_API_TOKEN || '';

var rtm = new RtmClient(token, {logLevel: 'debug'});
rtm.start();

```

### Capturing the `rtm.start` payload

The RTM client will emit a `RTM.AUTHENTICATED` event, with the `rtm.start` payload.

```js

var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});

```

### Listen to messages

```js

var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
  // Listens to all `message` events from the team
});

rtm.on(RTM_EVENTS.CHANNEL_CREATED, function (message) {
  // Listens to all `channel_created` events from the team
});

```

### Send messages

```js

var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;

// you need to wait for the client to fully connect before you can send messages
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
  // This will send the message 'this is a test message' to the channel identified by id 'C0CHZA86Q'
  rtm.sendMessage('this is a test message', 'C0CHZA86Q', function messageSent() {
    // optionally, you can supply a callback to execute once the message has been sent
  });
});

```

### Update messages

```js
rtm.sendMessage('doing stuff!', channel.id, function (err, msg) {
  msg.text = "Updated!";

  /* msg is an object which contains:
   * ts (string) Timestamp of the message to be updated
   * channel (string) ID of the channel the original message was sent in
   * text (string) New text to be displayed
   * opts (object) Additional options, see here: https://api.slack.com/methods/chat.update
   */
  rtm.updateMessage(msg, function (err, res) {
    console.log(err, res);
  });
});
```

### Data stores

```js
var RtmClient = require('@slack/client').RtmClient;

// The memory data store is a collection of useful functions we can include in our RtmClient
var MemoryDataStore = require('@slack/client').MemoryDataStore;

var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var token = process.env.SLACK_API_TOKEN;

var rtm = new RtmClient(token, {
  // Sets the level of logging we require
  logLevel: 'error',
  // Initialise a data store for our client, this will load additional helper functions for the storing and retrieval of data
  dataStore: new MemoryDataStore()
});

rtm.start();

// Wait for the client to connect
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function() {
  // Get the user's name
  var user = rtm.dataStore.getUserById(rtm.activeUserId);

  // Get the team's name
  var team = rtm.dataStore.getTeamById(rtm.activeTeamId);

  // Log the slack team name and the bot's name
  console.log('Connected to ' + team.name + ' as ' + user.name);
});
```

### Send Direct Messages
```js
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

// Responds to a message with a 'hello' DM
rtm.on(RTM_EVENTS.MESSAGE, function(message) {
  var user = rtm.dataStore.getUserById(message.user)

  var dm = rtm.dataStore.getDMByName(user.name);

  rtm.sendMessage('Hello ' + user.name + '!', dm.id);
});

```

### RTM Client Lifecycle

The RTM client has its own lifecycle events. These reflect the different states the RTM client can be in as it connects to Slack's RTM API.

The full details of the client lifecycle are in the [RTM client events file](/lib/clients/events/client.js)

The most important events are:
- `RTM_CONNECTION_OPENED`: the remote server has acked the socket and sent a `hello` message, the connection is now live and can be used to send messages
- `DISCONNECT`: the RTM client has disconnected and will not try to reconnect again automatically

## Web Client

### Uploading a file

See [examples/upload-a-file.js](/examples/upload-a-file.js)

## Incoming Webhook

### Setup

Go to https://slack.com/apps/manage/A0F7XDUAZ-incoming-webhooks and configure an incoming webhook. Grab the url.

### Sending Basic Text

```js
var IncomingWebhooks = require('@slack/client').IncomingWebhook;
// Anyone who has access to this url will be able to post your
// slack org without authentication. So don't save this value in version control
var url = process.env.SLACK_WEBHOOK_URL;

var wh = new IncomingWebhooks(url);

// This will send a message "Some Text" using the configuration
// chosen when creating the webhook
wh.send('Some text');

// You can pass an optional callback
wh.send('More text', function () {
  console.log('done sending');
});
```

### Sending More than Text

```js
// This will send a message "Some Text" and override
// the configuration values chosen when creating the webhook.
wh.send({
  text: 'Some text',
  channel: 'custom-channel',
  iconEmoji: ':robot_face:',
  username: 'Custom Name'
});

// You can send attachments as well
// See https://api.slack.com/docs/attachments
wh.send({
  text: 'Some text',
  attachments: [
    // attachment data
  ]
});
```

### Pre-Configure Defaults

```js
var wh = new IncomingWebhooks(url, {
  username: 'Custom Username',
  channel: 'custom-channel',
  iconEmoji: ':robot_face:',
  text: 'Default Text'
});

// This will send a message "Some Text" using the configuration
// that was passed in when the wh object was initialized
wh.send('Some text');

// This will send a message "Some Text" and override
// the values chosen when initializing the wh object
wh.send({
  text: 'Some text',
  channel: 'custom-channel',
  iconEmoji: ':robot_face:',
  username: 'Custom Name'
});
```

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
