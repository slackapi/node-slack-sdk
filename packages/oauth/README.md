# Slack Oauth

<!-- TODO: per-job badge https://github.com/bjfish/travis-matrix-badges/issues/4 -->
[![Build Status](https://travis-ci.org/slackapi/node-slack-sdk.svg?branch=master)](https://travis-ci.org/slackapi/node-slack-sdk)
<!-- TODO: per-flag badge https://docs.codecov.io/docs/flags#section-flag-badges-and-graphs -->
[![codecov](https://codecov.io/gh/slackapi/node-slack-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/slackapi/node-slack-sdk)
<!-- TODO: npm versions with scoped packages: https://github.com/rvagg/nodei.co/issues/24 -->

The `@slack/oauth` package makes it simple to setup the OAuth flow for slack apps. It supports [V2 OAuth](https://api.slack.com/authentication/oauth-v2) for new Slack Apps as well as [V1 OAuth](https://api.slack.com/docs/oauth ) for classic Slack apps.

## Installation

```shell
$ npm install @slack/oauth
```

<!-- START: Remove before copying into the docs directory -->

## Usage

These examples show how to get started using the most common features. You'll find even more extensive
[documentation on the package's website](https://slack.dev/node-slack-sdk/oauth-helper).

<!-- END: Remove before copying into the docs directory -->

Before building an app, you'll need to [create a Slack app](https://api.slack.com/apps/new) and install it to your
development workspace. You'll also **need a public URL** where the app can begin receiving events. Finally, you'll need
to find the **request signing secret** given to you by Slack under the "Basic Information" of your app configuration.

It may be helpful to read the tutorials on [getting started](https://slack.dev/node-slack-sdk/getting-started) and
[getting a public URL that can be used for development](https://slack.dev/node-slack-sdk/tutorials/local-development).

Simple setup with Express
```
const slackOauth = require('../../dist/index');
const express = require('express');

// intialize the installProvider
const installer = new slackOauth.InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  authVersion: 'v2',
  stateSecret: 'my-state-secret'
});


```

---

## Examples

*  [OAuth-v2](examples/oauth-v2)
*  [OAuth-v1](examples/oauth-v1) 

---

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
