# Node Slack SDK

[![build-ci](https://github.com/slackapi/node-slack-sdk/workflows/Node.js%20CI/badge.svg)](https://github.com/slackapi/node-slack-sdk/actions?query=workflow%3A%22Node.js+CI%22)
[![codecov](https://codecov.io/gh/slackapi/node-slack-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/slackapi/node-slack-sdk)
<!-- TODO: npm versions with scoped packages: https://github.com/rvagg/nodei.co/issues/24 -->

Visit the [documentation site](https://slack.dev/node-slack-sdk) for all the lovely details.

_This SDK is a collection of single-purpose packages. The packages are aimed at making building Slack apps
easy, performant, secure, and scalable. They can help with just about anything in the Slack platform, from dropping
notifications in channels to fully interactive bots._

The Slack platform offers several APIs to build apps. Each Slack API delivers part of the capabilities from the
platform, so that you can pick just those that fit for your needs. This SDK offers a corresponding package for each of
Slack's APIs. They are small and powerful when used independently, and work seamlessly when used together, too.

**Just starting out?** The [Getting Started tutorial](https://slackapi.github.io/node-slack-sdk/getting-started) will
walk you through building your first Slack app using Node.js.

| Slack API    | What its for | NPM Package      |
|--------------|--------------|-------------------|
| Web API      | Send data to or query data from Slack using any of [over 130 methods](https://api.slack.com/methods). | [`@slack/web-api`](https://slack.dev/node-slack-sdk/web-api) |
| Events API   | Listen for incoming messages and [many other events](https://api.slack.com/events) happening in Slack, using a URL. | [`@slack/events-api`](https://slack.dev/node-slack-sdk/events-api) |
| Interactive Messages | Respond to button clicks, dialogs, and other interactions with messages. | [`@slack/interactive-messages`](https://slack.dev/node-slack-sdk/interactive-messages) |
| OAuth        | Setup the authentication flow using V2 OAuth for Slack apps as well as V1 OAuth for classic Slack apps. | [`@slack/oauth`](https://slack.dev/node-slack-sdk/oauth) |
| RTM API      | Listen for incoming messages and a limited set of events happening in Slack, using websockets. | [`@slack/rtm-api`](https://slack.dev/node-slack-sdk/rtm-api) |
| Incoming Webhooks | Send notifications to a single channel which the user picks on installation. | [`@slack/webhook`](https://slack.dev/node-slack-sdk/webhook) |

**Not sure about which APIs are right for your app?** Read our [blog
post](https://medium.com/slack-developer-blog/getting-started-with-slacks-apis-f930c73fc889) that explains the options.
If you're still not sure, [reach out for help](#getting-help) and our community can guide you.

## Installation

Use your favorite package manager to install any of the packages and save to your `package.json`:

```shell
$ npm install @slack/web-api @slack/events-api

# Or, if you prefer yarn
$ yarn add @slack/web-api @slack/events-api
```

## Usage

The following examples summarize the most common ways to use this package. There's also a [Getting Started
tutorial](https://slack.dev/node-slack-sdk/getting-started) that's perfect for just starting out, and each
package's documentation, linked in the table above.

### Posting a message with Web API

Your app will interact with the Web API through the `WebClient` object, which is an export from `@slack/web-api`. You
typically instantiate a client with a token you received from Slack. The example below shows how to post a message into
a channel, DM, MPDM, or group. The `WebClient` object makes it simple to call any of the [**over 130 Web API
methods**](https://api.slack.com/methods).

```javascript
const { WebClient } = require('@slack/web-api');

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'C1232456';

(async () => {
  // See: https://api.slack.com/methods/chat.postMessage
  const res = await web.chat.postMessage({ channel: conversationId, text: 'Hello there' });

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
})();
```

**Note**: To use the example above, the token is required to have either the `bot`, `chat:user:write`, or
`chat:bot:write` scopes.

**Tip**: Use the [Block Kit Builder](https://api.slack.com/tools/block-kit-builder) for a playground
where you can prototype your message's look and feel.

### Listening for an event with the Events API

Your app will receive events at the Request URL you registered with Slack. Before completing that registration, you
need to verify that the URL belongs to you by responding to a challenge. There is a command line tool built into the
`@slack/events-api` package that you may use to respond to the challenge.

```shell
$ ./node_modules/.bin/slack-verify --secret <signing_secret> [--path=/slack/events] [--port=3000]
```

Run the command with your own signing secret (provided by Slack in the "Basic Information"), and optionally a path or a
port. A web server will be listening for requests containing a challenge and respond to them the way Slack expects. 

If your app's signing secret is "xxx123", any of the following works for you.

```
$ ./node_modules/.bin/slack-verify --secret xxx123
$ ./node_modules/.bin/slack-verify --secret xxx123 --path=/slack/events
$ ./node_modules/.bin/slack-verify --secret xxx123 --port=3000
$ ./node_modules/.bin/slack-verify --secret xxx123 --path=/slack/events --port=3000
```

Once the Request URL is verified and saved, you can stop the server with `Ctrl-C` and start working on your app. We also have
a tutorial with information about [getting a public URL that can be used for
development](https://slack.dev/node-slack-sdk/tutorials/local-development).

You app will use the `createEventAdapter()` function, which is an export from `@slack/events-api`. It creates an object
that emits events, just Node's built-in `EventEmitter`, except they are happening in Slack. It also has a `start()`
method, which starts a web server for you.

```javascript
// Initialize using signing secret from environment variables
const { createEventAdapter } = require('@slack/events-api');
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
const port = process.env.PORT || 3000;

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start a basic HTTP server
slackEvents.start(port).then(() => {
  // Listening on path '/slack/events' by default
  console.log(`server listening on port ${port}`);
});
```

If you have your own server, or are using a framework like `express`, you can plug the `slackEvents` object right
into those, too.

```javascript
// Initialize an express app
const app = require('express')();

// Attach the event adapter to the express app as a middleware
app.use('/slack/events', slackEvents.expressMiddleware());
```

```javascript
// Create a plain http server, and then attach the event adapter as a request listener
const { createServer } = require('http');
const server = createServer(slackEvents.requestListener());
```

**NOTE**: To use the examples above, you need to subscribe to `message.im` in the Event Subscriptions section of your
Slack App configuration settings.

### Responding to interactive messages

Your app will receive actions from interactive messages and other components at the Request URL you registered with
Slack. Unlike the Events API, the Request URL doesn't need to be verified, because you're only receiving actions from
messages your app generated in the first place. It may be helpful to read our tutorial on [getting a public URL that can
be used for development](https://slack.dev/node-slack-sdk/tutorials/local-development).

Your app will use the `createMessageAdapter()` function, which is an
export from `@slack/interactive-messages`. It creates an object that routes actions to the handlers you define. It also
has a `start()` method, which starts a web server for you.

```javascript
// Initialize using signing secret from environment variables
const { createMessageAdapter } = require('@slack/interactive-messages');
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);
const port = process.env.PORT || 3000;


// Handle interactions from messages with a `callback_id` of `welcome_button`
slackInteractions.action('welcome_button', (payload, respond) => {
  // `payload` contains information about the action
  // see: https://api.slack.com/docs/interactive-message-field-guide#action_url_invocation_payload
  console.log(payload);

  // `respond` is a function that can be used to follow up on the action with a message
  respond({
    text: 'Success!',
  });

  // The return value is used to update the message where the action occurred immediately.
  // Use this to items like buttons and menus that you only want a user to interact with once.
  return {
    text: 'Processing...',
  }
});

// Handle interactions from messages containing an action block with an `action_id` of `select_coffee`
slackInteractions.action({ actionId: 'select_coffee' }, (payload, respond) => {
  // `payload` contains information about the action
  // Block Kit Builder can be used to explore the payload shape for various action blocks:
  // https://api.slack.com/tools/block-kit-builder

  // `respond` and return value are the same as above.
});

// Start the built-in HTTP server
slackInteractions.start(port).then(() => {
  // Listening on path '/slack/actions' by default
  console.log(`server listening on port ${port}`);
});
```

If you have your own server, or are using a framework like `express`, you can plug the `slackInteractions` object right
into those, too.

```javascript
// Initialize an express app
const app = require('express')();

// Attach the interaction adapter to the express app as a middleware
app.use('/slack/actions', slackInteractions.expressMiddleware());
```

```javascript
// Create a plain http server, and then attach the interaction adapter as a request listener
const { createServer } = require('http');
const server = createServer(slackInteractions.requestListener());
```

### Using the Real-Time Messaging API

Your app will interact with the RTM API through the `RTMClient` object, which an export from `@slack/rtm-api`. You need
to instantiate it with a token, usually a bot token, that you received from Slack. The example below shows how to wait
for the RTM connection to be established, and then send a simple string message to a channel.

```javascript
const { RTMClient } = require('@slack/rtm-api');

// An access token (from your Slack app or custom integration - usually xoxb)
const token = process.env.SLACK_TOKEN;

// The client is initialized and then started to get an active connection to the platform
const rtm = new RTMClient(token);
rtm.start()
  .catch(console.error);

// Calling `rtm.on(eventName, eventHandler)` allows you to handle events (see: https://api.slack.com/events)
// When the connection is active, the 'ready' event will be triggered
rtm.on('ready', async () => {

  // Sending a message requires a channel ID, a DM ID, an MPDM ID, or a group ID
  // The following value is used as an example
  const conversationId = 'C1232456';

  // The RTM client can send simple string messages
  const res = await rtm.sendMessage('Hello there', conversationId);

  // `res` contains information about the sent message
  console.log('Message sent: ', res.ts);
});

// After the connection is open, your app will start receiving other events.
rtm.on('user_typing', (event) => {
  // The argument is the event as shown in the reference docs.
  // For example, https://api.slack.com/events/user_typing
  console.log(event);
})

```

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
