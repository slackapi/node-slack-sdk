---
title: Node Slack SDK
slug: /
---

The Node Slack SDK is a collection of single-purpose packages. The packages are aimed at making building Slack apps easy, performant, secure, and scalable. They can help with just about anything in the Slack platform, from dropping notifications in channels to fully interactive bots.

The Slack platform offers several APIs to build apps. Each Slack API delivers part of the capabilities from the
platform, so that you can pick just those that fit for your needs. 

The Node Slack SDK offers a corresponding package for each of Slack's APIs. They are small and powerful when used independently, and work seamlessly when used together, too.

**Just starting out?** The [Getting Started tutorial](/getting-started) will walk you through building your first Slack app using Node.js.

:::warning[Deprecation Notice]

`@slack/events-api` and `@slack/interactive-messages` officially reached EOL on May 31st, 2021. Development has fully stopped for these packages and all remaining open issues and pull requests have been closed.

At this time, we recommend migrating to [Bolt for JavaScript](https://github.com/slackapi/bolt-js), a framework that offers all of the functionality available in those packages (and more). To help with that process, we've provided some [migration samples](/tutorials/migrating-to-v6) for those looking to convert their existing apps.

:::

| Slack API    | What it's for | NPM Package      |
|--------------|--------------|-------------------|
| Web API      | Send data to or query data from Slack using any of [over 200 methods](https://api.slack.com/methods). | [`@slack/web-api`](https://slack.dev/node-slack-sdk/web-api) |
| OAuth        | Set up the authentication flow using V2 OAuth for Slack apps as well as V1 OAuth for classic Slack apps. | [`@slack/oauth`](https://slack.dev/node-slack-sdk/oauth) |
| Incoming Webhooks | Send notifications to a single channel which the user picks on installation. | [`@slack/webhook`](https://slack.dev/node-slack-sdk/webhook) |
| Socket Mode  | Listen for incoming messages and a limited set of events happening in Slack, using WebSocket. | [`@slack/socket-mode`](https://slack.dev/node-slack-sdk/socket-mode) |

## Installation

Use your favorite package manager to install any of the packages and save to your `package.json`:

You can use `npm`:

```shell
$ npm install @slack/web-api @slack/events-api
```

Or you can use `yarn`:

```shell
$ yarn add @slack/web-api @slack/events-api
```

## Requirements

This package supports Node v14 and higher. It's highly recommended to use [the latest LTS version of
node](https://github.com/nodejs/Release#release-schedule), and the documentation is written using syntax and features from that version.