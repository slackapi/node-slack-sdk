---
layout: page
title: RTM API client
permalink: /rtm_api
redirect_from: /bots
order: 3
headings:
    - title: Initializing and connecting
    - title: Sending a message
    - title: Receiving messages
    - title: Listening for message subtypes
    - title: Subscribing to presence updates
    - title: Handling other events
    - title: Data stores
    - title: Workspace cache on connect
    - title: Changing the retry configuration
    - title: Customizing the logger
    - title: Proxy settings
---

This package includes a RTM client that makes it simple to use the
[Slack RTM API](https://api.slack.com/rtm). Here are some of the goodies you get right
out of the box:

* Event emission - use it like any other Node EventEmitter
* Message queuing and rate-limit management
* Ping/Pong management
* Automatic reconnection
* Proxy support
* Message serialization
* Supports sending `typing`, `message`, and `presence_sub` events.
* Keeps track of your token
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

Here are some of the common recipies for using the `RtmClient` class.

---

### Initializing and connecting

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

// The client will emit an RTM.RTM_CONNECTION_OPEN the connection is ready for
// sending and recieving messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPEN, () => {
  console.log(`Ready`);
});

// Start the connecting process
rtm.start();
```

--------

### Sending a message

Of course, just starting a bot running doesn't accomplish much! It would be nice to be able to
send messages, right? The RTM client has a method called `sendMessage(text, channelId)` that will do
just that.

The example below shows an example where the `RtmClient` and `WebClient` are used
together. The web API method `channels.list` is used to get a current list of all channels and
can be iterated over to find one where the bot is a member. Once we have a channel ID, its as easy
as calling `rtm.sendMessage()`.

```javascript
const { RtmClient, CLIENT_EVENTS, WebClient } = require('@slack/client');

const token = process.env.SLACK_TOKEN;

const rtm = new RtmClient(token, {
  dataStore: false,
  useRtmConnect: true,
});
// Need a web client to find a channel where the app can post a message
const web = new WebClient(token);

// Load the current channels list asynchrously
let channelListPromise = web.channels.list();

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPEN, () => {
  console.log(`Ready`);
  // Wait for the channels list response
  channelsListPromise.then((res) => {

    // Take any channel for which the bot is a member
    const channel = res.channels.find(c => c.is_member);

    if (channel) {
      // We now have a channel ID to post a message in!
      // use the `sendMessage()` method to send a simple string to a channel using the channel ID
      rtm.sendMessage('Hello, world!', channel.id)
        // Returns a promise that resolves when the message is sent
        .then(() => console.log(`Message sent to channel ${channel.name}`))
        .catch(console.error);
    } else {
      console.log('This bot does not belong to any channels, invite it to at least one and try again');
    }
  });
});

// Start the connecting process
rtm.start();
```

---

### Receiving messages

The client will emit [message events](https://api.slack.com/events/message) whenever a new message
arrives in a channel in which your bot has access. The client can handle messages using the
`on(eventType, event)` method.

```javascript
const { RtmClient, CLIENT_EVENTS, RTM_EVENTS, WebClient } = require('@slack/client');
// SNIP: the initialization code shown above is skipped for brevity

rtm.on(RTM_EVENTS.MESSAGE, (message) => {
  // For structure of `message`, see https://api.slack.com/events/message

  // Skip messages that are from a bot or my own user ID
  if ( (message.subtype && message.subtype === 'bot_message') ||
       (!message.subtype && message.user === appData.selfId) ) {
    return;
  }

  // Log the message
  console.log('New message: ', message);
});
```

---

### Listening for message subtypes

There's a shortcut syntax for listening to specific message subtypes, just format the event type
as `message::${message_subtype}`. See the example below.

```javascript
const { RtmClient, CLIENT_EVENTS, RTM_EVENTS, RTM_MESSAGE_SUBTYPES, WebClient } = require('@slack/client');
// SNIP: the initialization code shown above is skipped for brevity

rtm.on(`${RTM_EVENTS.MESSAGE}::${RTM_MESSAGE_SUBTYPES.CHANNEL_NAME}`, (message) => {
  // For structure of `message`, see https://api.slack.com/events/message/channel_name
  console.log(`A channel was renamed from ${message.old_name} to ${message.name}`);
});
```

If you rename a channel in which the bot is a member, you should see the handler get triggered.

---

### Subscribing to presence updates

Polite people try not to inundate their colleages with messages when they know they are offline.
We can teach a bot the same ettiquette by subscribing to
[presence and status information](https://api.slack.com/docs/presence-and-status) for the
users with which it interacts.

You may not need to subscribe to presence updates if your bot is okay with fetching the user's
status on-demand using the
`[WebClient#users.getPresence()]({{ site.baseurl }}{% link _reference/UsersFacet.md %}#UsersFacet+getPresence)`
method.

If you do prefer to subscribe to presence updates, each time the client connects, your bot needs to
send a list of user IDs using the `subscribePresence(userIds)` method. The `userIds` argument is an
array of user IDs and the list must be complete -- any user IDs not included are unsubscribed from
your bot.

You can get more efficient `presence_change` events by using the `batch_presence_aware` option
while connecting. If you set the option to `true` your bot will receive `presence_change` events
with a `users` property that contains an array of user IDs (instead of a `user` property with a
single user ID). See more about the event: <https://api.slack.com/events/presence_change>.

The following example shows how a bot would keep a timecard for users to record their active
time or away time.

```javascript
const { RtmClient, CLIENT_EVENTS, RTM_EVENTS, WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - usually xoxb)
const token = process.env.SLACK_TOKEN;

// Initialize the RTM client. The dataStore option must be set to false.
const rtm = new RtmClient(token, {
  dataStore: false,
  useRtmConnect: true,
});

// Initialize the Web client
const web = new WebClient(token);

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


// RTM event handling
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPEN, () => {
  rtm.subscribePresence(getTrackedUsers());
});

// See: https://api.slack.com/events/presence_change
rtm.on(RTM_EVENTS.PRESENCE_CHANGE, (event) => {
  event.users.forEach(userId => updateTimecard(userId, event.presence));
});

// See: https://api.slack.com/events/member_joined_channel
rtm.on('member_joined_channel', (event) => {
  if (event.channel === timeTrackingChannelId) {
    // When a user joins, get that user's current presence in order to update the timecard
    web.users.getPresence(event.user)
      .then(resp => {
        updateTimecard(event.user, resp.presence);
        // Update subscriptions
        rtm.subscribePresence(getTrackedUsers());
      })
      .catch(console.error);
  }
});

// See: https://api.slack.com/events/member_left_channel
rtm.on('member_left_channel', (event) => {
  if (event.channel === timeTrackingChannelId) {
    // When a user leaves, the timecard records are deleted
    removeTimecard(event.user);
    // Update subscriptions
    rtm.subscribePresence(getTrackedUsers());
  }
});

// Start the connecting process
rtm.start({
  batch_presence_aware: true,
});
```

---

### Handling other events

Anything that happens in a Slack workspace, and that is visible to the bot (_i.e._ happens in a
channel to which the bot belongs) is communicated as an event as well. For a complete list of other
events, see <https://api.slack.com/rtm#events>. The event type values are available in a dictionary
in a top level export called `RTM_EVENTS`. The naming follows a convention of
`RTM_EVENTS.EVENT_NAME_UPPERCASED`. For example, we can listen for emoji reactions being added to
messages by electing to be notified on `RTM_EVENTS.REACTION_ADDED`:

```javascript
const { RtmClient, CLIENT_EVENTS, RTM_EVENTS, RTM_MESSAGE_SUBTYPES, WebClient } = require('@slack/client');
// SNIP: the initialization code shown above is skipped for brevity

rtm.on(RTM_EVENTS.REACTION_ADDED, (event) => {
  // For structure of `event`, see https://api.slack.com/events/reaction_added
  console.log(`User ${event.user} reacted with ${event.reaction}`);
});
```

---

### Data stores

The `SlackDataStore` (and its implementaion `SlackMemoryDataStore`) has been deprecated since
v3.15.0. Initializing the `RtmClient` with the option `dataStore: false` disables the data store,
and that is recommended.

The guide has been removed, but the reference documentation in the source is still available.

**The maintainers highly recommend**
[preparing your app](https://github.com/slackapi/node-slack-sdk/wiki/DataStore-v3.x-Migration-Guide)
to migrate if your app is using the data store.

---

### Workspace cache on connect

The `useRtmConnect` option on `RtmClient` initialization can give you control of how much workspace
state you recieve when you connect and recieve the `CLIENT_EVENTS.RTM.AUTHENTICATED` event.

If you set the value to `false` (not recommended for large teams), you'll recieve a cache the
relevent client state for your app. See the response in the
[`rtm.start`](https://api.slack.com/methods/rtm.start) reference documentation for a description of
the workspace cache.

This should be treated as a cache because this information can go stale quickly if you aren't
listening for every event to update the state. The maintainers recommend instead storing
only the state your app needs to operate in a variable, and then updating that variable in each
event that might mutate that state. A simpler alternative is to fetch the state you need from the
Web API whenever you need it.

---

### Changing the retry configuration

The `RtmClient` will retry sending any message that fails for a recoverable error. The policy is
configurable, but the default is retrying forever with an exponential backoff, capped at thirty
minutes but with some randomization. You can use the `retryConfig` option to customize that policy.
The value is an `options` object as described in the following library:
<https://github.com/tim-kos/node-retry>.

```javascript
const { RtmClient } = require('@slack/client');
const token = process.env.SLACK_TOKEN;
const rtm = new RtmClient(token, {
  retryConfig: {
    // This would turn the retrying feature off
    retries: 0,
  },
});
```

---

### Customizing the logger

The `RtmClient` also logs interesting events as it operates. By default, the log level is set to
`INFO` and it should not log anything as long as nothing goes wrong. You can adjust the log level
using the `logLevel` option and use any of the
[npm log levels](https://github.com/winstonjs/winston/tree/2.4.0#logging-levels).

You can also capture the logs without writing them to stdout by setting the `logger` option. It
should be set to a function that takes `fn(level: string, message: string)`.

```javascript
const fs = require('fs');
const { RtmClient } = require('@slack/client');

// open a file to write logs
// TODO: make sure to call `logStream.end()` when the app is shutting down
const logStream = fs.createWriteStream('/tmp/app.log');

const token = process.env.SLACK_TOKEN;
logStream.on('open', () => {
  const rtm = new RtmClient(token, {
    // increased logging, great for debugging
    logLevel: 'debug',
    logger: (level, message) => {
      // write to disk
      logStream.write(`[${level}]: ${message}`);
    }
  });
});
```

---

### Proxy settings

If you need to send all your HTTP requests through a proxy, the `RtmClient` class allows for you
to do this with the `transport` option.

```javascript
const { RtmClient } = require('@slack/client');
const { proxiedRequestTransport } = require('@slack/client/lib/clients/transports/request');
const { factory: wsTransportFactory } = require('@slack/client/lib/clients/transports/ws');

const wsTransport = factory(console.log.bind(console));
const rtm = new RtmClient(token, {
  transport: proxiedRequestTransport('your proxy url'),
  socketFn: function(socketURL) {
    return wsTransport(socketURL, { proxyURL: 'your proxy url' });
  }
});
```
