---
title: Socket Mode
permalink: /socket-mode
order: 7
anchor_links_header: Usage
---

# Slack Socket Mode


## Installation

```shell
$ npm install @slack/socket-mode
```

---

### Initialize the client

The package exports an `SocketModeClient` class. Your app will create an instance of the class for each workspace it
communicates with. Creating an instance requires a `app level token` from Slack. Apps connect to the `Socket Mode` API using the newly introduced `app level token`, which start with `xapp`.

Note: `Socket Mode` requires the scope of `connections:write`. In your browser, navigate to your app's app config and go to the `OAuth and Permissions` section to add the scope.



```javascript
const { SocketModeClient } = require('@slack/socket-mode');

// Read a token from the environment variables
const appToken = process.env.SLACK_APP_TOKEN;

// Initialize
const client = new SocketModeClient({appToken});
```

### Connect to Slack

Data from Slack will begin to flow to your program once the client is connected. You'll also be able to send data to
Slack after the connection is established. Connecting is as easy as calling the `.start()` method.

```javascript
const { SocketModeClient } = require('@slack/socket-mode');
const appToken = process.env.SLACK_APP_TOKEN;

const socketModeClient = new SocketModeClient(appToken);

(async () => {
  // Connect to Slack
  await socketModeClient.start();
})();
```
---

### Listen for an event

Apps register functions, called listeners, to be triggered when an event of a specific type is received by the client.
If you've used Node's [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter) pattern
before, then you're already familiar with how this works, since the client is an `EventEmitter`.

The `event` argument passed to the listener is an object. It's contents corresponds to the [type of
event](https://api.slack.com/events) its registered for.

```javascript
const { SocketModeClient } = require('@slack/socket-mode');
const appToken = process.env.SLACK_APP_TOKEN;

const socketModeClient = new SocketModeClient(appToken);

// Attach listeners to events by type. See: https://api.slack.com/events/message
socketModeClient.on('message', (event) => {
  console.log(event);
});

(async () => {
  await socketModeClient.start();
})();
```

---

### Send a message

To respond to events and send messages back into slack, it is recommend to use the `@slack/web-api` package with a `bot token`.

```javascript
const { SocketModeClient } = require('@slack/socket-mode');
const { WebClient } = require('@slack/web-api');

const socketModeClient = new SocketModeClient(process.env.SLACK_APP_TOKEN);
const webclient = new WebClient(process.env.BOT_TOKEN);

// Attach listeners to events by type. See: https://api.slack.com/events/message
socketModeClient.on('member_joined_channel', async ({event, body, ack}) => {
    try {
      // send acknowledgement back to slack over the socketMode websocket connection
      // this is so slack knows you have received the event and are processing it
      await ack();
      await webclient.chat.postMessage({
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
    } catch (error) {
      console.log('An error occurred', error);
    }
  });
```
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
| `authenticated` | `(connectData)` - the response from `apps.connections.open` | The client has authenticated with the platform. This is a sub-state of `connecting`. |
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
| `unable_to_socket_mode_start` | `(error)` | A problem occurred while connecting, a reconnect may or may not occur. |

---

### Logging

The `SocketModeClient` will log interesting information to the console by default. You can use the `logLevel` to decide how
much information, or how interesting the information needs to be, in order for it to be output. There are a few possible
log levels, which you can find in the `LogLevel` export. By default, the value is set to `LogLevel.INFO`. While you're
in development, its sometimes helpful to set this to the most verbose: `LogLevel.DEBUG`.

```javascript
// Import LogLevel from the package
const { SocketModeClient, LogLevel } = require('@slack/socket-mode');
const appToken = process.env.SLACK_APP_TOKEN;

// Log level is one of the options you can set in the constructor
const socketModeClient = new SocketModeClient({
  appToken,
  logLevel: LogLevel.DEBUG,
});

(async () => {
  await socketModeClient.start();
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

const socketModeClient = new SocketModeClient(appToken, {
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
  await socketModeClient.start();
})();
```
</details>

---

## Requirements

This package supports Node v12 LTS and higher. It's highly recommended to use [the latest LTS version of
node](https://github.com/nodejs/Release#release-schedule), and the documentation is written using syntax and features
from that version.

## Getting Help

If you get stuck, we're here to help. The following are the best ways to get assistance working through your issue:

  * [Issue Tracker](http://github.com/slackapi/node-slack-sdk/issues) for questions, feature requests, bug reports and
    general discussion related to these packages. Try searching before you create a new issue.
