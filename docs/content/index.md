---
title: Node Slack SDK
slug: /
---

The Node Slack SDK is a collection of single-purpose packages aimed at making building Slack apps performant, secure, and scalable. 

**Just starting out?** The [Getting Started tutorial](/getting-started) will walk you through building your first Slack app using Node.js.

## Slack APIs

The Node Slack SDK has corresponding packages for Slack APIs. They are small and powerful when used independently, and work seamlessly when used together, too.

| Slack API    | Use | NPM package      |
|--------------|--------------|-------------------|
| Web API      | Send data to or query data from Slack using any of [over 200 methods](https://api.slack.com/methods). | [`@slack/web-api`](https://tools.slack.dev/node-slack-sdk/web-api) |
| OAuth        | Set up the authentication flow using V2 OAuth for Slack apps as well as V1 OAuth for classic Slack apps. | [`@slack/oauth`](https://tools.slack.dev/node-slack-sdk/oauth) |
| Incoming Webhooks | Send notifications to a single channel which the user picks on installation. | [`@slack/webhook`](https://tools.slack.dev/node-slack-sdk/webhook) |
| Socket Mode  | Listen for incoming messages and a limited set of events happening in Slack, using WebSocket. | [`@slack/socket-mode`](https://tools.slack.dev/node-slack-sdk/socket-mode) |

:::warning[Deprecation Notice]

`@slack/events-api` and `@slack/interactive-messages` officially reached EOL on May 31st, 2021. Development has fully stopped for these packages and all remaining open issues and pull requests have been closed.

At this time, we recommend migrating to [Bolt for JavaScript](https://github.com/slackapi/bolt-js), a framework that offers all of the functionality available in those packages (and more). To help with that process, we've provided some [migration samples](/tutorials/migrating-to-v6) for those looking to convert their existing apps.

:::

## Installation

This package supports Node v14 and higher. It's highly recommended to use [the latest LTS version of
node](https://github.com/nodejs/Release#release-schedule), and the documentation is written using syntax and features from that version.

Use your favorite package manager to install any of the packages and save to your `package.json`:

You can use `npm`:

```shell
$ npm install @slack/web-api @slack/oauth
```

Or you can use `yarn`:

```shell
$ yarn add @slack/web-api @slack/oauth
```

## Getting help

These docs have lots of information on the Node Slack SDK. There's also an in-depth Reference section. Please explore!

If you otherwise get stuck, we're here to help. The following are the best ways to get assistance working through your issue:

* [Issue Tracker](http://github.com/slackapi/node-slack-sdk/issues) for questions, bug reports, feature requests, and general discussion related to the Node Slack SDK. Try searching for an existing issue before creating a new one.
* [Email](mailto:support@slack.com) our developer support team: `support@slack.com`.

## Contributing

These docs live within the [Node Slack SDK](https://github.com/slackapi/node-slack-sdk) repository and are open source.

We welcome contributions from everyone! Please check out our
[Contributor's Guide](https://github.com/slackapi/node-slack-sdk/blob/main/.github/contributing.md) for how to contribute in a helpful and collaborative way.
