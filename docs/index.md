---
layout: page
permalink: /
order: 0
headings:
    - title: Motivation
    - title: Requirements
    - title: Installation
    - title: Getting Help
---

So you want to build a Slack app with Node.js? We've got you covered. {{ site.product_name }} is aimed at making
building Slack apps ridiculously easy. This module will help you build on all aspects of the Slack platform,
from dropping notifications in channels to fully interactive bots.

This is a wrapper around the Slack [RTM](https://api.slack.com/rtm) and [Web](https://api.slack.com/web) APIs.

This library provides the low level functionality you need to build reliable apps and projects on top of Slack's APIs.
It:

 - handles reconnection logic and request retries
 - provides reasonable defaults for events and logging
 - defines a basic model layer and data-store for caching Slack RTM API responses

This library does not attempt to provide application level support, _e.g._ regex matching and filtering of the
conversation stream.


## Requirements and Installation

Of course, you'll need Node.js, as well as NPM. NPM has
[a great tutorial](https://docs.npmjs.com/getting-started/installing-node) to help you get started if you don't have
these tools installed.

To install, you will first want to create a new Node.js project. The simplest way is to use your computer's terminal app
to invoke

```bash
npm init
```

This script will prompt you to describe the app you are going to build, and create a file that NPM can use to help
manage your project.

Once you have a working project, you can install {{ site.product_name }} as a dependency by invoking

```bash
npm install @slack/client --save
```

Once you've installed {{ site.product_name }} as a dependency you can start using it in your code. Look at
[Basic Usage](basic_usage.html) to get started.

## Getting Help

If you get stuck, we're here to help. The following are the best ways to get assistance working through your issue:

  * [Issue Tracker](http://github.com/slackapi/{{ site.repo_name }}/issues) for reporting bugs or requesting features.
  * [dev4slack channel](https://dev4slack.slack.com/archives/{{ site.dev4slack_channel }}) for getting help using
  {{ site.product_name }} or just generally commiserating with your fellow developers.
