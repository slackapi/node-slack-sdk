---
layout: page
permalink: /
redirect_from: /faq
order: 0
headings:
    - title: Requirements
    - title: Installation
    - title: Features
    - title: Getting Help
---

So you want to build a Slack app with Node.js? We've got you covered. {{ site.product_name }} is aimed at making
building Slack apps ridiculously easy. This package will help you build on all aspects of the Slack platform,
from dropping notifications in channels to fully interactive bots.

## Requirements

This package supports node starting from major **version 0.12 and later**. It's highly recommended
to use [the latest LTS version of node](https://github.com/nodejs/Release#release-schedule), and the
documentation is written using syntax and features from that version.

## Installation

Use npm to install the package and save it to your `package.json`:

```shell
$ npm install @slack/client
```

## Features

The Slack platform offers several APIs to build apps. Each API delivers part of the capabilities
from the platform, with a range of complexity and functionality, so that you can pick the one that
fits for your app.

| Slack API    | Outgoing | Incoming | NPM Package         | Documentation     |
|--------------|:--------:|:--------:|---------------------|-------------------|
| Web API      | ⬆️        | ⬜️       | `@slack/client`     | [Guide]({{ site.baseurl }}{% link _pages/web_client.md %}) |
| RTM API      | ⬆️        | ⬇️        | `@slack/client`     | [Guide]({{ site.baseurl }}{% link _pages/rtm_client.md %}) |
| Incoming Webhooks | ⬆️   | ⬜️       | `@slack/client`     | [Guide]({{ site.baseurl }}{% link _pages/incoming_webhook.md %}) |
| Events API   | ⬜️       | ⬇️        | `@slack/events-api` | [README](https://github.com/slackapi/node-slack-events-api) |
| Interactive Messages | ⬜️ | ⬇️      | `@slack/interactive-messages` | [README](https://github.com/slackapi/node-slack-interactive-messages) |

**Just starting out?** We suggest starting at the
[Getting Started guide]({{ site.baseurl }}{% link _pages/getting_started.md %}) which will walk you
through building your first Slack app using Node.js.

**Not sure about which APIs are right for your app?** Read our
[helpful blog post](https://medium.com/slack-developer-blog/getting-started-with-slacks-apis-f930c73fc889)
that explains and compares the options. If you're still not sure,
[reach out for help](#getting-help) and our community can guide you.

---

You'll notice that some of the API tools are not included in the `@slack/client` package.
This reflects the fact that those tools function as HTTP servers, whereas this package contains
the tools which function as HTTP clients. Separating these packages gives you the flexibility to
only depend on the parts that fit into your app.

If you're looking for an all-in-one solution that hides the underlying Slack APIs, but
simplifies building a bot-style app inside Slack, try the
[Hubot Slack adapter](https://slackapi.github.io/hubot-slack/). This framework is popular for
internal apps that automate workflows, ChatOps, and silly meme generating bots.

## Getting Help

If you get stuck, we're here to help. The following are the best ways to get assistance working through your issue:

  * [Issue Tracker](http://github.com/slackapi/{{ site.repo_name }}/issues) for questions, feature
    requests, bug reports and general discussion related to this package.
  * [Email us](mailto:developers@slack.com) in Slack developer support: `developers@slack.com`
  * [Bot Developers Hangout](https://community.botkit.ai/): a Slack community for developers
    building all types of bots. You can find the maintainers and users of this package in **#sdk-node-slack-sdk**.
