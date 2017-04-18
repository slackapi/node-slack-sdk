---
layout: page
title: Building Bots
permalink: /bots
order: 6
headings:
    - title: Initializing a bot
    - title: Posting a message
    - title: Bots are Event consumers
    - title: Receiving messages
    - title: Handling other events
    - title: Data stores
    - title: Putting it together
---

So you want to build a bot? You've come to the right place. This guide will get you started building
bots, but lucky you there is an [entire book](https://amzn.com/B01ENNEMBW) written on the subject of building bots with
this module. If you are serious about bots, we heartily recommend this book.

In the meantime, here are some thoughts on getting started.

See [Tokens & Authentication]({{ site.baseurl | prepend: site.url }}/auth) for API token best practices.

--------

## Initializing a bot

Bots can interact with the Slack Platform in one of two ways, either the Real-Time Messaging (RTM) service, or the
Events API service. At the moment, {{ site.product_name }} only supports the RTM service; all interaction will be
through an instance of the `RTMClient` class.

Starting a bot up requires a bot token (bot tokens start with `xoxb-`),
which can be had either creating a [custom bot](https://my.slack.com/apps/A0F7YS25R-bots) or by creating an app with a
bot user, at the end of the [OAuth dance](https://api.slack.com/docs/oauth). If you aren't sure path is right for you,
have a look at the [Bot Users documentation](https://api.slack.com/bot-users).

```js
var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var bot_token = process.env.SLACK_BOT_TOKEN || '';

var rtm = new RtmClient(bot_token);

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload if you want to cache it
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});

rtm.start();
```

--------

## Posting a message

Of course, just starting a bot running doesn't accomplish much! It would be nice to be able to send messages, right? We
can do that by sending a message over the RTM connection as such.

```js
var RtmClient = require('@slack/client').RtmClient;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;

var bot_token = process.env.SLACK_BOT_TOKEN || '';

var rtm = new RtmClient(bot_token);
rtm.start();

var channel = "#general"; //could also be a channel, group, DM, or user ID (C1234), or a username (@don)

// you need to wait for the client to fully connect before you can send messages
rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
  rtm.sendMessage("Hello!", channel);
});
```

--------

## Bots are Event consumers

What differentiates bots from other kinds of apps is that Slack pushes _events_ to bots. An event is anything that
changes the state of a Slack team: A message being posted into a channel, yes, but also: Someone new joining the team,
someone joining a channel, a reaction being added to a message, &c., &c. So a bot is basically an event handler.
Programming a bot is largely a process of deciding _which_ events to handle, and then determining how each should be
handled. You can read more about the range and kinds of events that Slack emits in the
[Events documentation](https://api.slack.com/events).

Bots are like vampires: They have to be invited in. Bots will only receive events that are either at the team level
(such as new members joining the team), or at the level of channels _of which the bot is a member_. Bots _do not_
receive events for channels they are not members of&mdash;this is a security issue. So do make sure you've invited your bot
into at least one channel before testing!

Of course, the vast majority of the time, your bot will care primarily about `message` events... let's see how to handle
those first.

--------

## Receiving messages

One kind of event is the `message` event. As you might guess, this event encapsulates a message that someone has sent,
and that we receive over the RTM connection. We can subscribe to `message` events with `rtm.on()`.

```js
var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var bot_token = process.env.SLACK_BOT_TOKEN || '';

var rtm = new RtmClient(bot_token);

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  console.log('Message:', message); //this is no doubt the lamest possible message handler, but you get the idea
});

rtm.start();
```

--------

## Handling other events

Of course, anything that happens in a Slack team, and that is visible to the bot (_i.e._ happens in a channel to which
the bot belongs) is communicated as an event as well. You can listen for people and fellow bots joining and leaving the
team, joining and leaving channels, messages being starred or pinned, or emoji reactions being added and removed from
messages. You can learn more about the [range of events available](https://api.slack.com/events), and subscribe to those
events with `RTM_EVENTS.EVENT_NAME_UPPERCASED`. For example, we can listen for emoji reactions being added to messages
by electing to be notified on `RTM_EVENTS.REACTION_ADDED`:

```js
var RtmClient = require('@slack/client').RtmClient;

var bot_token = process.env.SLACK_BOT_TOKEN || '';

var rtm = new RtmClient(bot_token);
rtm.start();

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
  console.log('Reaction added:', reaction);
});
```

--------

## Data stores

{{ site.product_name }} can cache some Slack information for you. You need to provide an object that implements the API
defined by the class `SlackDataStore`. We provide a basic in-memory store called `MemoryDataStore` that you can use for
development, but we strongly encourage you to look to some kind of persistence layer other than memory for a production
app.

```js
var RtmClient = require('@slack/client').RtmClient;

// The memory data store is a collection of useful functions we can include in our RtmClient
var MemoryDataStore = require('@slack/client').MemoryDataStore;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var bot_token = process.env.SLACK_BOT_TOKEN || '';

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

--------

## Putting it together

Here is an example that listens for people to say "Hello.", and that responds with "Hello @bob!" in the same channel.

```js
var RtmClient = require('@slack/client').RtmClient;

var bot_token = process.env.SLACK_BOT_TOKEN || '';

var rtm = new RtmClient(bot_token);
rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  if (message.text === "Hello.") {
    var channel = "#general"; //could also be a channel, group, DM, or user ID (C1234), or a username (@don)
    rtm.sendMessage("Hello <@" + message.user + ">!", message.channel);
  }
});
```
