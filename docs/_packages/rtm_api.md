---
title: Real Time Messaging API
permalink: /rtm-api
redirect_from:
  - /bots
  - /rtm_api
order: 5
---

# Slack Real Time Messaging API

The `@slack/rtm-api` package contains a simple, convenient, and configurable client for receiving events and sending simple messages to Slack's [Real Time Messaging API](https://api.slack.com/rtm). Use it in your
app to stay connected to the Slack platform over a persistent Websocket connection.

**Note**: RTM isn't available for modern scoped apps anymore. We recommend using the [Events API](https://slack.dev/node-slack-sdk/events-api) and [Web API](https://slack.dev/node-slack-sdk/web-api) instead. If you need to use RTM (possibly due to corporate firewall limitations), you can do so by creating a [legacy scoped app](https://api.slack.com/apps?new_classic_app=1). If you have an existing RTM app, do not update its scopes as it will be updated to a modern scoped app and stop working with RTM.

## Installation

```shell
$ npm install @slack/rtm-api
```

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

### Presence

A user's [presence](https://api.slack.com/docs/presence-and-status#user_presence) can take one of two values: `active`
or `away`. Your app may be interested in known when a user in a workspace's presence changes. The client helps your app
set up [presence subscriptions](https://api.slack.com/docs/presence-and-status#user_presence) to track the changes in
presence for a list of users. In order to track presence, you need to know each user's user ID, and call the
`.subscribePresence(userIds)` method.

The `userIds` argument is an array, and it must include the **entire list of user IDs that your app is interested in receiving updates regarding**. This means that if you've subscribed to any users
previously, and you're trying to add subscriptions for new users, you should include the users from the previous call
to `.subscribePresence(userIds)` in the next call.

If instead of being informed when a user's presence changes (reactively), your app needs to know what the user's status
is currently (proactively), then your app should use the [`WebClient`](https://slack.dev/node-slack-sdk/web-api)'s
`users.getPresence` method. In general, its easier to deal with user presence proactively than to keep track of all the
changes to understand the current presence of a user.

The following example shows how you might try to track the presence of all members of a specific channel. This example
does not try to track members who were already in the channel when the bot joined or the app started running, only
users who joined the channel after the app started.

```javascript
const { RTMClient } = require('@slack/rtm-api');
const token = process.env.SLACK_BOT_TOKEN;
const rtm = new RTMClient(token);

// Presence subscription state, and helper
const trackedUserIds = [];
function addPresenceSubscriptions(userIds) {
  await rtm.subscribePresence(trackedUserIds.concat(userIds));
  trackedUserIds.push(...userIds);
}

// Given: a channel ID where users' presence is subscribed
const trackedChannelId = 'C123456';

// Listen for users who join a channel, and subscribe to their presence
rtm.on('member_joined_channel', async (event) => {
  // Don't proceed for events outside of the single channel
  if (event.channel !== trackedChannelId) {
    return;
  }

  // Add the subscription
  try {
    await addPresenceSubscriptions([event.user]);
    console.log('Subscribed to presence for an additional user');
  } catch (error) {
    console.log('Failed to subscribe to presence, error: ', error);
  }
});

// For those user's whose presence was subscribed, log the updates to the console.
rtm.on('presence_change', (event) => {
  console.log(`User: ${event.user} Presence: ${event.presence}`);
});

(async () => {
  await rtm.start();
})();
```

<details>
<summary markdown="span">
<strong><i>Batch presence updates</i></strong>
</summary>

Your app can receive even more efficient presence updates, by batching many users' updates into the same event. The
`batch_presence_aware` start option can be set to `true` and will allow Slack to send `presence_change` events with an
array of users instead of one event for each individual user. This means your app will spend less time processing events
when many users change their presence at around the same time.

The example above can be rewritten to take advantage of this efficiency as follows.

```javascript
const { RTMClient } = require('@slack/rtm-api');
const token = process.env.SLACK_BOT_TOKEN;
const rtm = new RTMClient(token);

const trackedUserIds = [];
async function addPresenceSubscriptions(userIds) {
  await rtm.subscribePresence(trackedUserIds.concat(userIds));
  trackedUserIds.push(...userIds);
}

const trackedChannelId = 'C123456';

rtm.on('member_joined_channel', async (event) => {
  if (event.channel !== trackedChannelId) {
    return;
  }

  try {
    await addPresenceSubscriptions([event.user]);
    console.log('Subscribed to presence for an additional user');
  } catch (error) {
    console.log('Failed to subscribe to presence, error: ', error);
  }
});

rtm.on('presence_change', (event) => {
  // Iterate over each user in the event, and log the presence
  event.users.forEach((user) => {
    console.log(`User: ${event.user} Presence: ${event.presence}`);
  });
});

(async () => {
  // Use the batch_presence_aware start option
  await rtm.start({ batch_presence_aware: true });
})();
```
</details>

---

### Proxy requests with a custom agent

The client allows you to customize the HTTP
[`Agent`](https://nodejs.org/docs/latest/api/http.html#http_class_http_agent) used to create the connection to Slack.
Using this option is the best way to make all requests from your app through a proxy, which is a common requirement in
many corporate settings.

In order to create an `Agent` from some proxy information (such as a host, port, username, and password), you can use
one of many npm packages. We recommend [`https-proxy-agent`](https://www.npmjs.com/package/https-proxy-agent). Start
by installing this package and saving it to your `package.json`.

```shell
$ npm install https-proxy-agent
```

Import the `HttpsProxyAgent` class, and create an instance that can be used as the `agent` option of the `RTMClient`.

```javascript
const { RTMClient } = require('@slack/rtm-api');
const HttpsProxyAgent = require('https-proxy-agent');
const token = process.env.SLACK_BOT_TOKEN;

// One of the ways you can configure HttpsProxyAgent is using a simple string.
// See: https://github.com/TooTallNate/node-https-proxy-agent for more options
const proxy = new HttpsProxyAgent(process.env.http_proxy || 'http://168.63.76.32:3128');

const rtm = new RTMClient(token, { agent: proxy });

// The connection will now go through the proxy
(async () => {
  await rtm.start();
})();
```

---

### Reconnect automatically

If the client's connection to Slack is interrupted, the client will attempt to reconnect to Slack automatically, by
default. Your app can choose to monitor when this occurs using the [lifecycle events](#lifecycle-events), specifically
the `reconnecting` and `connected` events.

If you'd like to turn the automatic reconnection behavior off, the `autoReconnect` option can be set to `false`.

```javascript
const { RTMClient } = require('@slack/rtm-api');
const token = process.env.SLACK_BOT_TOKEN;

// Initialize without automatic reconnection
const rtm = new RTMClient(token, { autoReconnect: false });
```

---

### Custom TLS configuration

Each connection to Slack starts with a handshake that allows your app to trust that it is actually Slack you are
connecting to. The system for establishing this trust is called TLS. In order for TLS to work, the host running your app
keeps a list of trusted **certificate authorities**, that it can use to verify a signature Slack produces. You don't
usually see this list, its usually a part of the operating system you're running on. In very special cases, like certain
testing techniques, you might want to send a request to another party that doesn't have a valid TLS signature that your
certificate authority would verify. In these cases, you can provide alternative TLS settings, in order to change how the
operating system might determine whether the signature is valid. You can use the `tls` option to describe the settings
you want (these settings are the most common and useful from the [standard Node
API](https://nodejs.org/dist/latest/docs/api/tls.html#tls_tls_createsecurecontext_options)).

```javascript
const { RTMClient } = require('@slack/rtm-api');
const { readFileSync } = require('fs');
const token = process.env.SLACK_BOT_TOKEN;

// Load a custom certificate authority from a file in the current directory
const ca = readFileSync('./ca.crt');

// Initialize a client with the custom certificate authority
const rtm = new RTMClient(token, { tls: { ca } });
```

| `tls` property  | Description  |
|-----------------|--------------|
| `ca`            | Optionally override the trusted CA certificates. Any `string` or `Buffer` can contain multiple PEM CAs concatenated together. |
| `key`           | Private keys in PEM format. PEM allows the option of private keys being encrypted. Encrypted keys will be decrypted with `passphrase`. |
| `cert`          | Cert chains in PEM format. One cert chain should be provided per private key. |
| `pfx`           | PFX or PKCS12 encoded private key and certificate chain. `pfx` is an alternative to providing `key` and `cert` individually. PFX is usually encrypted, if it is, `passphrase` will be used to decrypt it. |
| `passphrase`    | Shared passphrase used for a single private key and/or a PFX. |

---

### Custom API URL

The URLs for requests to Slack always begin with `https://slack.com/api/`. In very special cases, such as certain
testing techniques, you might want to send these requests to a different URL. The `slackApiUrl` option allows you to
replace this prefix with another.

```javascript
const { RTMClient } = require('@slack/rtm-api');
const token = process.env.SLACK_BOT_TOKEN;

const options = {};

// In a testing environment, configure the client to send requests to a mock server
if (process.env.NODE_ENV === 'test') {
  options.slackApiUrl = 'http://localhost:8888/api/';
}

// Initialize a client using the configuration
const rtm = new RTMClient(token, options);
```

---

### Workspace state snapshot

The client can receive a snapshot of a portion of the workspace's state while its connecting. This can be useful if your
app needs to keep track of some data as it changes while the app runs, but it needs the initial start to get started.
However, **this can also cause the client to fail to connect on large teams**. Our recommendation is to call the [Web
API](https://slack.dev/node-slack-sdk/web-api) to retrieve workspace state while your app is connecting, instead of
relying on the cache. See [sending rich messages](#send-messages) for an example of using the `WebClient` class inside
your app, and use [some of the other methods](https://api.slack.com/methods) to get data.

If you're certain that you'd like to receive the snapshot, you can set the `useRtmConnect` option to `false`. This
configures the client to use the [`rtm.start`](https://api.slack.com/methods/rtm.start) method (instead of
`rtm.connect`), and emit the snapshot on the `authenticated` event.

```javascript
const { RTMClient } = require('@slack/rtm-api');
const token = process.env.SLACK_BOT_TOKEN;

// Initialize a client to receive a snapshot of the workspace state
const rtm = new RTMClient(token, { useRtmConnect: false });

// Listen for the authenticated event to capture the snapshot
rtm.on('authenticated', (snapshot) => {
  console.log(snapshot)
});

(async () => {
  await rtm.start();
})();
```
