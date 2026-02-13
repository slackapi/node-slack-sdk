# Node Slack SDK

[![build-ci](https://github.com/slackapi/node-slack-sdk/actions/workflows/ci-build.yml/badge.svg)](https://github.com/slackapi/node-slack-sdk/actions/workflows/ci-build.yml)
<!-- TODO: npm versions with scoped packages: https://github.com/rvagg/nodei.co/issues/24 -->
___

## Getting Started

Visit the [documentation site](https://docs.slack.dev/tools/node-slack-sdk/) for all the lovely details.

_This SDK is a collection of single-purpose packages. The packages are aimed at making building Slack apps
easy, performant, secure, and scalable. They can help with just about anything in the Slack platform, from dropping
notifications in channels to fully interactive bots._

The Slack platform offers several APIs to build apps. Each Slack API delivers part of the capabilities from the
platform, so that you can pick just those that fit for your needs. This SDK offers a corresponding package for each of
Slack's APIs. They are small and powerful when used independently, and work seamlessly when used together, too.

**Just starting out?** The [Getting Started tutorial](https://docs.slack.dev/tools/node-slack-sdk/getting-started) will
walk you through building your first Slack app using Node.js.

| Slack API    | Use | NPM Package      |
|--------------|--------------|-------------------|
| Web API      | Send data to or query data from Slack using any of [over 220 methods](https://docs.slack.dev/reference/methods). | [`@slack/web-api`](https://docs.slack.dev/tools/node-slack-sdk/web-api) |
| OAuth        | Set up the authentication flow using V2 OAuth for Slack apps as well as V1 OAuth for classic Slack apps. | [`@slack/oauth`](https://docs.slack.dev/tools/node-slack-sdk/oauth) |
| Incoming Webhooks | Send notifications to a single channel which the user picks on installation. | [`@slack/webhook`](https://docs.slack.dev/tools/node-slack-sdk/webhook) |
| Socket Mode  | Listen for incoming messages and a limited set of events happening in Slack, using WebSocket. | [`@slack/socket-mode`](https://docs.slack.dev/tools/node-slack-sdk/socket-mode) |

**Not sure about which APIs are right for your app?** Read our [blog
post](https://medium.com/slack-developer-blog/getting-started-with-slacks-apis-f930c73fc889) that explains the options.
If you're still not sure, [reach out for help](#getting-help) and our community can guide you.

## Installation

Use your favorite package manager to install any of the packages and save to your `package.json`:

```shell
$ npm install @slack/web-api @slack/socket-mode

# Or, if you prefer yarn
$ yarn add @slack/web-api @slack/socket-mode
```

## Usage

The following examples summarize the most common ways to use this package. There's also a [Getting Started
tutorial](https://docs.slack.dev/tools/node-slack-sdk/getting-started) that's perfect for just starting out, and each
package's documentation, linked in the table above.

### Posting a message with Web API

Your app will interact with the Web API through the `WebClient` object, which is an export from `@slack/web-api`. You
typically instantiate a client with a token you received from Slack. The example below shows how to post a message into
a channel, DM, MPDM, or group. The `WebClient` object makes it simple to call any of the [**over 130 Web API
methods**](https://docs.slack.dev/reference/methods).

```javascript
const { WebClient } = require('@slack/web-api');

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'C1232456';

(async () => {
  // See: https://docs.slack.dev/reference/methods/chat.postMessage
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

Refer to [Bolt for JavaScript document pages](https://docs.slack.dev/tools/bolt-js/concepts/event-listening).

### Responding to interactive messages

Refer to [Bolt for JavaScript document pages](https://docs.slack.dev/tools/bolt-js/concepts/actions).

### Using Socket Mode

Refer to [the module document page](https://docs.slack.dev/tools/node-slack-sdk/socket-mode) and [Bolt for JavaScript document page](https://docs.slack.dev/bolt-js/concepts/socket-mode).

## Requirements

This package supports Node v14 and higher. It's highly recommended to use [the latest LTS version of
node](https://github.com/nodejs/Release#release-schedule), and the documentation is written using syntax and features
from that version.

## Getting Help

If you get stuck, we're here to help. The following are the best ways to get assistance working through your issue:

  * [Issue Tracker](http://github.com/slackapi/node-slack-sdk/issues) for questions, feature requests, bug reports and
    general discussion related to these packages. Try searching before you create a new issue.
  * [Email us](mailto:developers@slack.com) in Slack developer support: `developers@slack.com`
