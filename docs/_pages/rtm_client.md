---
layout: page
title: RTM API client
permalink: /rtm_api
redirect_from: /bots
order: 3
headings:
    - title: Connecting and sending a message
    - title: Receiving messages
    - title: Combining with the WebClient
    - title: Lifecycle events
    - title: Listening for message subtypes
    - title: Subscribing to presence updates
    - title: Handling other events
    - title: Subscribing to presence updates
    - title: Workspace cache on connect
    - title: Customizing the logger
    - title: Custom agent for proxy support
---

This package includes an RTM client that makes it simple to use the
[Slack RTM API](https://api.slack.com/rtm). Here are some of the goodies you get right
out of the box:

* Event emission - use it like any other Node EventEmitter
* Message queuing
* Connection state management
* Keep-alive processing
* Automatic reconnection
* Message serialization
* Convenience methods for sending `typing`, `message`, and `presence_sub` events.
* Error handling
* Logging
* Configurability

An RTM client allows your app to listen for incoming events as well as send outgoing events. It's
a quick solution for many apps -- especially for those that may only be about to create outgoing
connections due to firewall restrictions, or only ever connect to one workspace.

But the RTM client does not have access to the full power of the Slack platform, including message
attachments, buttons, menus, and dialogs. It also does not scale to many instances because it is
stateful, and does not scale well for apps that are connected to many workspaces because of Shared
Channels. The most robust app building solution is through a combination of the
[Web API]({{ site.baseurl }}{% link _pages/web_client.md %}) and the
[Events API](https://github.com/slackapi/node-slack-events-api).

Here are some of the common recipies for using the `RTMClient` class.

---

### Connecting and sending a message

Your app will interact with the RTM API through the `RTMClient` object, which is a top level
export from this package. At a minimum, you need to instantiate it with a token, usually a
bot token.

```javascript
const { RTMClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - usually xoxb)
const token = process.env.SLACK_TOKEN;

// The client is initialized and then started to get an active connection to the platform
const rtm = new RTMClient(token);
rtm.start();

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
// See the "Combining with the WebClient" topic below for an example of how to get this ID
const conversationId = 'C1232456';

// The RTM client can send simple string messages
rtm.sendMessage('Hello there', conversationId)
  .then((res) => {
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);
```

---

### Receiving messages

The client will emit [message events](https://api.slack.com/events/message) whenever a new message arrives in a channel
in which your bot has access. The client can handle messages using the `on('message', messageHandler)` method.

```javascript
const { RTMClient } = require('@slack/client');
// SNIP: the initialization code shown above is skipped for brevity

rtm.on('message', (event) => {
  // For structure of `event`, see https://api.slack.com/events/message

  // Skip messages that are from a bot or my own user ID
  if ( (message.subtype && message.subtype === 'bot_message') ||
       (!message.subtype && message.user === rtm.activeUserId) ) {
    return;
  }

  // Log the message
  console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
});
```

---

### Combining with the WebClient

The example below shows an example where the `RTMClient` and `WebClient` are used together. The web API method
`channels.list` is used to get a current list of all channels and can be iterated over to find one where the bot is a
member. Once we have a channel ID, sending a message is as easy as calling `rtm.sendMessage()`.

```javascript
const { RTMClient, WebClient } = require('@slack/client');

const token = process.env.SLACK_TOKEN;

// The client is initialized and then started to get an active connection to the platform
const rtm = new RTMClient(token);
rtm.start();

// Need a web client to find a channel where the app can post a message
const web = new WebClient(token);

// Load the current channels list asynchrously
web.channels.list()
  .then((res) => {
    // Take any channel for which the bot is a member
    const channel = res.channels.find(c => c.is_member);

    if (channel) {
      // We now have a channel ID to post a message in!
      // use the `sendMessage()` method to send a simple string to a channel using the channel ID
      rtm.sendMessage('Hello, world!', channel.id)
        // Returns a promise that resolves when the message is sent
        .then((msg) => console.log(`Message sent to channel ${channel.name} with ts:${msg.ts}`))
        .catch(console.error);
    } else {
      console.log('This bot does not belong to any channel, invite it to at least one and try again');
    }
  });
```

---

### Lifecycle events

| Event Name | Arguments | Description |
|-----------------|-----------------|-------------|
| `disconnected`  |  | The client is not connected to the platform. This is a steady state - no attempt to connect is occurring. |
| `connecting`    |  | The client is in the process of connecting to the platform. |
| `authenticated` | `(connectData)` - the response from `rtm.connect` or `rtm.start` | The client has authenticated with the platform. This is a sub-state of `connecting`. |
| `connected`     |  | The client is connected to the platform and incoming events will start being emittied. |
| `ready`         |  | The client is ready to send outgoing messages. This is a sub-state of `connected` |
| `disconnecting` |  | The client is no longer connected to the platform and cleaning up its resources. It will soon transition to `disconnected`. |
| `reconnecting`  |  | The client is no longer connected to the platform and cleaning up its resources. It will soon transition to `connecting`. |
| `error`         | `(error)` | An error has occurred. Check `error.code` against the dictionary in the top-level export called `ErrorCode` |
| `unable_to_rtm_start` | `(error)` | A problem occurred while connecting, a reconnect may or may not occur. Use of this event is discouraged since `disconnecting` and `reconnecting` are more meaningful. |
| `slack_event`   | `(eventType, event)` | An incoming Slack event has been received. |
| `{type}`        | `('{type}', event)`        | An incoming Slack event of type `{type}` has been received. |
| `{type}::{subtype}` | `('{type}::{subtype}', event)` | An incoming Slack event of type `{type}` and subtype `{subtype}` has been received. |
| `raw_message`   | `(message)`   | A websocket message arrived. The message is an unparsed string. Use of this event is discouraged since `slack_event` is more useful. |

---

### Listening for message subtypes

There's a shortcut syntax for listening to specific message subtypes, just format the event type as
`message::${message_subtype}`. See the example below.

```javascript
rtm.on(`message::channel_name`, (event) => {
  // For structure of `event`, see https://api.slack.com/events/message/channel_name
  console.log(`A channel was renamed from ${message.old_name} to ${message.name}`);
});
```

If you rename a channel in which the bot is a member, you should see the log message.

---

### Handling other events

Anything that happens in a Slack workspace, and that is visible to the bot (_i.e._ happens in a channel to which the bot
belongs and visible to its scopes) is communicated as an event as well. For a complete list of other events, see
<https://api.slack.com/rtm#events>.

```javascript
const { RTMClient } = require('@slack/client');
// SNIP: the initialization code shown above is skipped for brevity

rtm.on('reaction_added', (event) => {
  // For structure of `event`, see https://api.slack.com/events/reaction_added
  console.log(`User ${event.user} reacted with ${event.reaction}`);
});
```

---

### Subscribing to presence updates

Polite people try not to inundate their colleages with messages when they know they are offline. We can teach a bot the
same ettiquette by subscribing to [presence and status information](https://api.slack.com/docs/presence-and-status) for
the users with which it interacts.

You may not need to subscribe to presence updates if your bot is okay with fetching the user's status on-demand using
the `WebClient.users.getPresence()` method.

If you do prefer to subscribe to presence updates, each time the client connects, your bot needs to send a list of user
IDs using the `subscribePresence(userIds)` method. The `userIds` argument is an array of user IDs and the list must be
complete -- any user IDs not included are unsubscribed from your bot.

You can get more efficient `presence_change` events by using the `batch_presence_aware` option while connecting. If you
set the option to `true` your bot will receive `presence_change` events with a `users` property that contains an array
of user IDs (instead of a `user` property with a single user ID). See more about the event:
<https://api.slack.com/events/presence_change>.

The following example shows how a bot would keep a timecard for users to record their active time or away time.

```javascript
const { RTMClient, WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - usually xoxb)
const token = process.env.SLACK_TOKEN;

// Initialize the clients
const rtm = new RTMClient(token);
const web = new WebClient(token);
rtm.start({
  batch_presence_aware: true,
});

// Timecard data - In order for this data to survive a restart, it should be backed by a database.
// Keys: user IDs (string)
// Values: presence updates (array of { timestamp: number, presence: 'away'|'active' })
const timecards = new Map();
const getTrackedUsers = () => Array.from(timecards.keys())
const updateTimecard = (userId, presence) => {
  if (!timecards.has(userId)) {
    timecards.set(userId, []);
  }
  const userRecord = timecards.get(userId);
  userRecord.push({ timestamp: Date.now(), presence });
}
const removeTimecard = (userId) => timecards.delete(userId);


// Timecard data is tracked for users in a pre-defined channel
const timeTrackingChannelId = 'C123456';

// Inform the platform which users presence we want events for
rtm.subscribePresence(getTrackedUsers());

// See: https://api.slack.com/events/presence_change
rtm.on('presence_change', (event) => {
  event.users.forEach(userId => updateTimecard(userId, event.presence));
});

// See: https://api.slack.com/events/member_joined_channel
rtm.on(RTM_EVENTS.MEMBER_JOINED_CHANNEL, (event) => {
  if (event.channel === timeTrackingChannelId) {
    // When a user joins, get that user's current presence in order to update the timecard
    web.users.getPresence({ user: event.user })
      .then(resp => {
        updateTimecard(event.user, resp.presence);
        // Update subscriptions
        rtm.subscribePresence(getTrackedUsers());
      })
      .catch(console.error);
  }
});

// See: https://api.slack.com/events/member_left_channel
rtm.on(RTM_EVENTS.MEMBER_LEFT_CHANNEL, (event) => {
  if (event.channel === timeTrackingChannelId) {
    // When a user leaves, the timecard records are deleted
    removeTimecard(event.user);
    // Update subscriptions
    rtm.subscribePresence(getTrackedUsers());
  }
});
```

---

### Workspace cache on connect

The `useRtmConnect` option on `RTMClient` initialization can give you control of how much workspace state you recieve
when you connect and recieve the `authenticated` event.

If you set the value to `false` (not recommended for large teams), you'll recieve a cache the relevent client state
for your app. See the response in the [`rtm.start`](https://api.slack.com/methods/rtm.start) reference documentation
for a description of the workspace cache.

This should be treated as a cache because this information can go stale quickly if you aren't listening for every event
to update the state. The maintainers recommend instead storing only the state your app needs to operate in a variable,
and then updating that variable in each event that might mutate that state. A simpler alternative is to fetch the state
you need from the Web API whenever you need it.

---

### Customizing the logger

The `RTMClient` also logs interesting events as it operates. By default, the log level is set to `info` and it should
not log anything as long as nothing goes wrong.

You can adjust the log level by setting the `logLevel` option to any of the values found in the `LogLevel` top-level
export.

You can also capture the logs without writing them to stdout by setting the `logger` option. It should be set to a
function that takes `fn(level: string, message: string)`.

```javascript
const fs = require('fs');
const { RTMClient, LogLevel } = require('@slack/client');

// open a file to write logs
// TODO: make sure to call `logStream.end()` when the app is shutting down
const logStream = fs.createWriteStream('/tmp/app.log');

const token = process.env.SLACK_TOKEN;
logStream.on('open', () => {
  const rtm = new RTMClient(token, {
    // increased logging, great for debugging
    logLevel: LogLevel.DEBUG,
    logger: (level, message) => {
      // write to disk
      logStream.write(`[${level}]: ${message}`);
    }
  });
});
```

---

### Custom agent for proxy support

In order to pass outgoing requests through an HTTP proxy, you'll first need to install an additional package in your
application:

```
$ npm install --save https-proxy-agent
```

Next, use the `agent` option to configure with your proxy settings.

```javascript
const HttpsProxyAgent = require('https-proxy-agent');
const { RTMClient } = require('@slack/client');

// in this example, we read the token from an environment variable. its best practice to keep sensitive data outside
// your source code.
const token = process.env.SLACK_TOKEN;

// its common to read the proxy URL from an environment variable, since it also may be sensitive.
// NOTE: for a more complex proxy configuration, see the https-proxy-agent documentation:
// https://github.com/TooTallNate/node-https-proxy-agent#api
const proxyUrl = process.env.http_proxy || 'http://12.34.56.78:9999';

// To use Slack's RTM API:
const web = new RTMClient(token, { agent: new HttpsProxyAgent(proxyUrl) });
```
