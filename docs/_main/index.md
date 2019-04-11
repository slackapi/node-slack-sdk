---
title: Node Slack SDK
permalink: /
redirect_from: /faq
hidden: true
headings:
    - title: Packages
    - title: Installation
    - title: Requirements
    - title: Getting Help
---

The Slack platform offers several APIs to build apps. Each Slack API delivers part of the capabilities from the
platform, so that you can pick just those that fit for your needs. This SDK offers a corresponding package for each of
Slack's APIs. They are small and powerful when used independently, and work seamlessly when used together, too.

**Just starting out?** The [Getting Started tutorial](https://slackapi.github.io/node-slack-sdk/getting-started) will
walk you through building your first Slack app using Node.js.

| Slack API    | What its for | NPM Package    |
|--------------|--------------|-------------------|
| Web API      | Send data to or query data from Slack using any of [over 130 methods](https://api.slack.com/methods). | [`@slack/web-api`](https://slack.dev/node-slack-sdk/web-api) |
| Events API   | Listen for incoming messages and [many other events](https://api.slack.com/events) happening in Slack, using a URL. | [`@slack/events-api`](https://slack.dev/node-slack-sdk/events-api) |
| Interactive Messages | Respond to button clicks, dialogs, and other interactions with messages. | [`@slack/interactive-messages`](https://slack.dev/node-slack-sdk/interactive-messages) |
| RTM API      | Listen for incoming messages and a limited set of events happening in Slack, using websockets. | [`@slack/rtm-api`](https://slack.dev/node-slack-sdk/rtm-api) |
| Incoming Webhooks | Send notifications to a single channel which the user picks on installation. | [`@slack/webhook`](https://slack.dev/node-slack-sdk/webhook) |

**Not sure about which APIs are right for your app?** Read our [blog
post](https://medium.com/slack-developer-blog/getting-started-with-slacks-apis-f930c73fc889) that explains the options.
If you're still not sure, [reach out for help](#getting-help) and our community can guide you.

If you're looking for an all-in-one solution that hides the underlying Slack APIs, but simplifies building a bot-style
app inside Slack, try the [Hubot Slack adapter](https://slackapi.github.io/hubot-slack/). Hubot is a popular framework
for internal apps that automate workflows, perform ChatOps, or just generate silly memes.

## Installation

Use your favorite package manager to install any of the packages and save to your `package.json`:

```shell
$ npm install @slack/web-api @slack/events-api

# Or, if you prefer yarn
$ yarn add @slack/web-api @slack/events-api
```

## Requirements

This package supports Node v8 LTS and higher. It's highly recommended to use [the latest LTS version of
node](https://github.com/nodejs/Release#release-schedule), and the documentation is written using syntax and features
from that version.

## Getting Help

If you get stuck, we're here to help. The following are the best ways to get assistance working through your issue:

  * [Issue Tracker](http://github.com/slackapi/{{ site.repo_name }}/issues) for questions, feature
    requests, bug reports and general discussion related to this package.
  * [Email us](mailto:developers@slack.com) in Slack developer support: `developers@slack.com`
  * [Bot Developers Hangout](https://community.botkit.ai/): a Slack community for developers
    building all types of bots. You can find the maintainers and users of this package in **#sdk-node-slack-sdk**.
