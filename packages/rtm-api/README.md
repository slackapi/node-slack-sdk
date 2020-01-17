# Slack Real Time Messaging API

<!-- TODO: per-job badge https://github.com/bjfish/travis-matrix-badges/issues/4 -->
[![Build Status](https://travis-ci.org/slackapi/node-slack-sdk.svg?branch=master)](https://travis-ci.org/slackapi/node-slack-sdk)
<!-- TODO: per-flag badge https://docs.codecov.io/docs/flags#section-flag-badges-and-graphs -->
[![codecov](https://codecov.io/gh/slackapi/node-slack-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/slackapi/node-slack-sdk)
<!-- TODO: npm versions with scoped packages: https://github.com/rvagg/nodei.co/issues/24 -->

The `@slack/rtm-api` package contains a simple, convenient, and configurable client for receiving events and sending simple messages to Slack's [Real Time Messaging API](https://api.slack.com/rtm). Use it in your
app to stay connected to the Slack platform over a persistent Websocket connection.

**Note**: RTM isn't available for modern scoped apps anymore. We recommend using the [Events API](https://slack.dev/node-slack-sdk/events-api) and [Web API](https://slack.dev/node-slack-sdk/web-api) instead. If you need to use RTM (possibly due to corporate firewall limitations), you can do so by creating a [legacy scoped app](https://api.slack.com/apps?new_classic_app=1). If you have an existing RTM app, do not update its scopes as it will be updated to a modern scoped app and stop working with RTM.

## Installation

```shell
$ npm install @slack/rtm-api
```

<!-- START: Remove before copying into the docs directory -->

## Usage

These examples show the most common features of the `RTMClient`. You'll find even more extensive [documentation on the
package's website](https://slack.dev/node-slack-sdk/rtm-api).

<!-- END: Remove before copying into the docs directory -->

---

### Initialize the client

The package exports an `RTMClient` class. Your app will create an instance of the class for each workspace it
communicates with. Creating an instance requires a `token` from Slack. Apps typically connect to the RTM API using a bot
token, which start with `xoxb`. These tokens are created for apps that have a Bot User, so to connect to the RTM API be
sure to add a Bot User in your app configuration page. Once the app is installed to the development workspace, you'll
have a bot token.

```javascript
const { RTMClient } = require('@slack/rtm-api');

// Read a token from the environment variables
const token = process.env.SLACK_BOT_TOKEN;

// Initialize
const rtm = new RTMClient(token);
```

### Connect to Slack

Data from Slack will begin to flow to your program once the client is connected. You'll also be able to send data to
Slack after the connection is established. Connecting is as easy as calling the `.start()` method. This method returns a
`Promise` that resolves to the data returned from the [`rtm.connect` Web API
method](https://api.slack.com/methods/rtm.connect).

```javascript
const { RTMClient } = require('@slack/rtm-api');
const token = process.env.SLACK_BOT_TOKEN;

const rtm = new RTMClient(token);

(async () => {
  // Connect to Slack
  const { self, team } = await rtm.start();
})();
```

It's useful in many apps to keep information about the bot user who you've connected as, as well as the workspace you've
connected to. That information has been destructured into the variables `self` and `team` above. If you only need the
user ID and team ID, you can look those up any time the client is connected as the `rtm.activeUserId` and
`rtm.activeTeamId` properties. In fact, if you need to know whether the client is connected or not, you can check the
`rtm.connected` property.

<details>
<summary markdown="span">
<strong><i>Additional connection options</i></strong>
</summary>

Options passed to the `.start()` method are passed through as arguments to the [`rtm.connect` Web API
method](https://api.slack.com/methods/rtm.connect). These arguments deal with presence, which is discussed in more
detail [on the documentation website](https://slack.dev/node-slack-sdk/rtm-api#presence).

</details>

---

### Listen for an event

Apps register functions, called listeners, to be triggered when an event of a specific type is received by the client.
If you've used Node's [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter) pattern
before, then you're already familiar with how this works, since the client is an `EventEmitter`.

The `event` argument passed to the listener is an object. It's contents corresponds to the [type of
event](https://api.slack.com/events) its registered for.

```javascript
const { RTMClient } = require('@slack/rtm-api');
const token = process.env.SLACK_BOT_TOKEN;
const rtm = new RTMClient(token);

// Attach listeners to events by type. See: https://api.slack.com/events/message
rtm.on('message', (event) => {
  console.log(event);
});

(async () => {
  await rtm.start();
})();
```

<details>
<summary markdown="span">
<strong><i>Listen for message subtypes</i></strong>
</summary>

The `message` event type has a special property called `subtype` to help organize all the messages inside Slack. The
client has a convenient shorthand for listening to events of type `message`, but filtered to a specific `subtype`.
The shorthand is to add the `::` characters, followed by the name of the subtype, to the event type.

```javascript
const { RTMClient } = require('@slack/rtm-api');
const token = process.env.SLACK_BOT_TOKEN;
const rtm = new RTMClient(token);

// Attach listeners to events by message subtype. See: https://api.slack.com/events/message/channel_purpose
rtm.on('message::channel_purpose', (event) => {
  console.log(event);
});

(async () => {
  await rtm.start();
})();
```

</details>

---

### Send a message

Your app can send simple messages to Slack over the client's connection. In this case, simple means that it cannot
send messages that include attachments or blocks, but it can include text, mentions, and links which unfurl.
The client has a `.sendMessage(text, conversationId)` method for sending messages to Slack. That method returns a
`Promise` which resolves once Slack has acknowledged the message with a
[reply](https://api.slack.com/rtm#handling_responses). The resolved value contains information about the sent message,
such as the `ts` identifier. See [error handling](#handle-errors) for details on how your app should deal with a
`Promise` rejection.

```javascript
const { RTMClient } = require('@slack/rtm-api');
const token = process.env.SLACK_BOT_TOKEN;
const rtm = new RTMClient(token);

// Listen for users who join a channel that the bot user is a member of
// See: https://api.slack.com/events/member_joined_channel
rtm.on('member_joined_channel', async (event) => {
  try {
    // Send a welcome message to the same channel where the new member just joined, and mention the user.
    const reply = await rtm.sendMessage(`Welcome to the channel, <@${event.user}>`, event.channel)
    console.log('Message sent successfully', reply.ts);
  } catch (error) {
    console.log('An error occurred', error);
  }
});

(async () => {
  await rtm.start();
})();
```

<details>
<summary markdown="span">
<strong><i>Send rich messages using the WebClient</i></strong>
</summary>

The Web API's [`chat.postMessage` method](https://api.slack.com/methods/chat.postMessage) is capable of sending [rich
messages](https://api.slack.com/messaging/composing/layouts) more advanced layout and interactions. These rich messages
are more attractive and useful for users of your app. Install and import the `@slack/web-api` package into your app,
initialize the `WebClient` class, and use the `.chat.postMessage(options)` method to send a rich message. The example
above can be rewritten using the following code:

```javascript
const { RTMClient } = require('@slack/rtm-api');
const token = process.env.SLACK_BOT_TOKEN;
const rtm = new RTMClient(token);

// Import the WebClient, and initialize it with the same bot token
const { WebClient } = require('@slack/web-api');
const web = new WebClient(token);

// Listen for users who join a channel that the bot user is a member of
// See: https://api.slack.com/events/member_joined_channel
rtm.on('member_joined_channel', async (event) => {
  try {
    // Send a welcome message with a button to the same channel where the new member just joined.
    const result = await web.chat.postMessage({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Welcome to the channel, <@${event.user}>. We're here to help. Let us know if you have an issue.`,
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Get Help',
            },
            value: 'get_help',
          },
        },
      ],
      channel: event.channel,
    });
    console.log('Message sent successfully', result.ts);
  } catch (error) {
    console.log('An error occurred', error);
  }
});

(async () => {
  await rtm.start();
})();
```

</details>

<details>
<summary markdown="span">
<strong><i>Send a typing indicator</i></strong>
</summary>

Over the RTM API, your bot user can appear to be typing in Slack before it sends a message ("{Bot Display Name} is
typing" is shown near the text input). The client has a `.sendTyping(conversationId)` method to allow your bot to
trigger the typing indicator. The method returns a `Promise` that resolves when Slack has acknowledged the message. The
`Promise` doesn't have a resolved value.

If you decide to use this method, make sure your bot follows up with an actual message. Otherwise, the bot user may
appear to be typing for a very long time.

```javascript
const { RTMClient } = require('@slack/rtm-api');
const token = process.env.SLACK_BOT_TOKEN;
const rtm = new RTMClient(token);

// Listen for users who join a channel that the bot user is a member of
// See: https://api.slack.com/events/member_joined_channel
rtm.on('member_joined_channel', async (event) => {
  try {
    // Send a typing indicator, and wait for 3 seconds
    await rtm.sendTyping(event.channel);
    await (new Promise((resolve) => setTimeout(resolve, 3000)));

    // Send a message (clears typing indicator)
    const reply = await rtm.sendMessage(`Welcome to the channel, <@${event.user}>`, event.channel)
    console.log('Message sent successfully', reply.ts);
  } catch (error) {
    console.log('An error occurred', error);
  }
});

(async () => {
  await rtm.start();
})();
```

</details>

---

### Lifecycle events

The client's connection to Slack has a lifecycle. This means the client can be seen as a state machine which transitions
through a few states as it connects, disconnects, reconnects, and synchronizes with Slack. The client emits an event
for each state it transitions to throughout its lifecycle. If your app simply needs to know whether the client is
connected or not, the `.connected` boolean property can be checked.

In the table below, the client's states are listed, which are also the names of the events you can use to observe
the transition to that state. The table also includes description for the state, and arguments that a listener would
receive.

| Event Name      | Arguments | Description |
|-----------------|-----------------|-------------|
| `connecting`    |  | The client is in the process of connecting to the platform. |
| `authenticated` | `(connectData)` - the response from `rtm.connect` or `rtm.start` | The client has authenticated with the platform. This is a sub-state of `connecting`. |
| `connected`     |  | The client is connected to the platform and incoming events will start being emitted. |
| `ready`         |  | The client is ready to send outgoing messages. This is a sub-state of `connected` |
| `disconnecting` |  | The client is no longer connected to the platform and cleaning up its resources. It will soon transition to `disconnected`. |
| `reconnecting`  |  | The client is no longer connected to the platform and cleaning up its resources. It will soon transition to `connecting`. |
| `disconnected`  | `(error)` | The client is not connected to the platform. This is a steady state - no attempt to connect is occurring. The `error` argument will be `undefined` when the client initiated the disconnect (normal). |

The client also emits events that are part of its lifecycle, but aren't states. Instead, they represent specific
moments that might be interesting to your app. The following table lists these events, their description, and includes
the arguments that a listener would receive.

| Event Name      | Arguments | Description |
|-----------------|-----------|-------------|
| `error`         | `(error)` | An error has occurred. See [error handling](#handle-errors) for details. |
| `slack_event`   | `(eventType, event)` | An incoming Slack event has been received. |
| `unable_to_rtm_start` | `(error)` | A problem occurred while connecting, a reconnect may or may not occur. |

---

### Handle errors

Errors can happen for many reasons: maybe the token isn't valid, maybe you tried to send a message while the client is
disconnected, or maybe you just used a bad argument. In these cases, the returned `Promise` will reject with an `Error`.
You should catch the error and use the information it contains to decide how your app can proceed.

Each error contains a `code` property, which you can check against the `ErrorCode` export to understand the kind of
error you're dealing with. For example, when Slack responds to your app with an error, that is an
`ErrorCode.SendMessagePlatformError`. These types of errors provide Slack's response body as the `data` property.

```javascript
// Import ErrorCode from the package
const { RTMClient, ErrorCode } = require('@slack/rtm-api');
const token = process.env.SLACK_BOT_TOKEN;
const rtm = new RTMClient(token);

rtm.on('member_joined_channel', async (event) => {
  try {
    const reply = await rtm.sendMessage(`Welcome to the channel, <@${event.user}>`, event.channel)
    console.log('Message sent successfully', reply.ts);
  } catch (error) {
    // Check the error code, and when its a platform error, log the whole response
    if (error.code === ErrorCode.SendMessagePlatformError) {
      console.log(error.data);
    } else {
      // Some other error, oh no!
      console.log('Well, that was unexpected.');
    }
  }
});

(async () => {
  await rtm.start();
})();
```

<details>
<summary markdown="span">
<strong><i>More error types</i></strong>
</summary>

There are a few more types of errors that you might encounter, each with one of these `code`s:

* `ErrorCode.NoReplyReceivedError`: A message was sent, but because either the connection was reset the there was no
  reply acknowledging it from the server. You may want to send this message again.
* `ErrorCode.SendWhileDisconnectedError`: You've attempted to send a message while the client was not connected.
* `ErrorCode.SendWhileNotReadyError`: You've attempted to send a message when the client was authenticated but not ready
  for outgoing messages.
* `ErrorCode.WebsocketError`: The Websocket transport underlying the connection has emitted an error.

</details>

---

### Logging

The `RTMClient` will log interesting information to the console by default. You can use the `logLevel` to decide how
much information, or how interesting the information needs to be, in order for it to be output. There are a few possible
log levels, which you can find in the `LogLevel` export. By default, the value is set to `LogLevel.INFO`. While you're
in development, its sometimes helpful to set this to the most verbose: `LogLevel.DEBUG`.

```javascript
// Import LogLevel from the package
const { RTMClient, LogLevel } = require('@slack/rtm-api');
const token = process.env.SLACK_BOT_TOKEN;

// Log level is one of the options you can set in the constructor
const rtm = new RTMClient(token, {
  logLevel: LogLevel.DEBUG,
});

(async () => {
  await rtm.start();
})();
```

All the log levels, in order of most to least information are: `DEBUG`, `INFO`, `WARN`, and `ERROR`.

<details>
<summary markdown="span">
<strong><i>Sending log output somewhere besides the console</i></strong>
</summary>

You can also choose to have logs sent to a custom logger using the `logger` option. A custom logger needs to implement
specific methods (known as the `Logger` interface):

| Method       | Parameters        | Return type |
|--------------|-------------------|-------------|
| `setLevel()` | `level: LogLevel` | `void`      |
| `setName()`  | `name: string`    | `void`      |
| `debug()`    | `...msgs: any[]`  | `void`      |
| `info()`     | `...msgs: any[]`  | `void`      |
| `warn()`     | `...msgs: any[]`  | `void`      |
| `error()`    | `...msgs: any[]`  | `void`      |

A very simple custom logger might ignore the name and level, and write all messages to a file.

```javascript
const { createWriteStream } = require('fs');
const logWritable = createWriteStream('/var/my_log_file'); // Not shown: close this stream

const rtm = new RTMClient(token, {
  // Creating a logger as a literal object. It's more likely that you'd create a class.
  logger: {
    debug(...msgs): { logWritable.write('debug: ' + JSON.stringify(msgs)); },
    info(...msgs): { logWritable.write('info: ' + JSON.stringify(msgs)); },
    warn(...msgs): { logWritable.write('warn: ' + JSON.stringify(msgs)); },
    error(...msgs): { logWritable.write('error: ' + JSON.stringify(msgs)); },
    setLevel(): { },
    setName(): { },
  },
});

(async () => {
  await rtm.start();
})();
```
</details>

---

### More

*  User presence subscriptions
*  Workspace state snapshot on connection
*  Using a custom agent for proxying
*  Automatic reconnect
*  Custom TLS configuration
*  Custom API URL

---

## Requirements

This package supports Node v8 LTS and higher. It's highly recommended to use [the latest LTS version of
node](https://github.com/nodejs/Release#release-schedule), and the documentation is written using syntax and features
from that version.

## Getting Help

If you get stuck, we're here to help. The following are the best ways to get assistance working through your issue:

  * [Issue Tracker](http://github.com/slackapi/node-slack-sdk/issues) for questions, feature requests, bug reports and
    general discussion related to these packages. Try searching before you create a new issue.
  * [Email us](mailto:developers@slack.com) in Slack developer support: `developers@slack.com`
  * [Bot Developers Hangout](https://community.botkit.ai/): a Slack community for developers
    building all types of bots. You can find the maintainers and users of these packages in **#sdk-node-slack-sdk**.
