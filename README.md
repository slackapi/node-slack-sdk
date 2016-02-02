# Node.js Slack Client Library

## Travis-CI Build Status

[![Build Status](https://travis-ci.org/slackhq/node-slack-client.png?branch=master)](https://travis-ci.org/slackhq/node-slack-client)

## Description

This is the beta Slack client 2.0.0 library for node.js, it:
- wraps the [Slack Web API](https://api.slack.com/web) methods
- exposes the [Real Time Messaging API's](https://api.slack.com/rtm) functionality

## Beta Status

Please note that this client is a complete rewrite of the 1.5.1 slack-client library.

It's still under active development, so issues and PRs are very welcome.

There are likely still a number of bugs to address in this release before it's ready for a full 2.0.0, so use with caution!

## Installation

```bash
npm install slack-client@2.0.0-beta.5 --save
```

## Usage
```js

var RtmClient = require('slack-client').RtmClient;

var token = process.env.SLACK_API_TOKEN || '';

var rtm = new RtmClient(token, {logLevel: 'debug'});
rtm.start();

rtm.on('message', function(message) {
    console.log(message);
});

```

A full example of how to use this module from Node.js can be found in the [/examples directory](examples).

## Contribute

Here's the most direct way to get your work merged into the project.

1. Fork the project
2. Clone down your fork
3. Create a feature branch
4. Hack away and add tests, not necessarily in that order
5. Make sure everything still passes by running tests
6. If necessary, rebase your commits into logical chunks without errors
7. Add yourself to package.json as a contributor
8. Push the branch up to your fork
9. Send a pull request for your branch

## Copyright

Copyright &copy; Slack Technologies, Inc. MIT License; see LICENSE for further details.
