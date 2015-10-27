# Node.js Slack Client Library

## node-slack v2.0.0 please read!

Hi all,

First of all, thanks for using this library :) We really appreciate all the developers out there who want to integrate with Slack and build cool bots and tools.

I've been working on a substantial refactor of the existing node-client library for the past little while and it's now at the point where getting your feedback would be fantastic.

That refactor is located on [my personal github](https://github.com/l12s/node-slack-client).

The refactor has 3 main goals:
- get node-slack to a point where it can be easily maintained and extended, both by Slack and our delightful external contributors:
  - improve test coverage
  - standardize code; e.g. move off coffee script, make heavier use of npm modules etc.
  - update JSDoc, code comments and inline documentation
- address flaws in the existing client, e.g.
  - improve reconnection logic
  - respect 429 headers
  - improve the client so that it can be used as the foundation for more complex apps and use cases, e.g. design to support different types of datastores
- add documentation, examples and test apps

There are still some issues outstanding on the refactor, which can be seen [here](https://github.com/l12s/node-slack-client/issues)

What would be great to get some help on is:
- code review; please check out the code and raise any issues you run into
- test it out; it would be great to get a few test applications written to shake out any bugs, or if you have an app already to see

## Travis-CI Build Status

[![Build Status](https://travis-ci.org/slackhq/node-slack-client.png?branch=master)](https://travis-ci.org/slackhq/node-slack-client)

## Description

This is the Slack client library for node.js, it:
- wraps the [Slack Web API](https://api.slack.com/web) methods
- exposes the [Real Time Messaging API's](https://api.slack.com/rtm) functionality

## Installation

```bash
npm install slack-client --save
```

## Usage
```js

var RtmClient = require('slack-client').RtmClient;

var token = '' || process.env.SLACK_API_TOKEN;

var rtm = new RtmClient(token, {logLevel: 'debug'});
rtm.start();

rtm.on('message', function(message) {
    console.log(message);
});

```

A full example of how to use this module from Node.js can be found in the [/examples directory](https://github.com/slackhq/node-slack-client/tree/master/examples).

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


## v2.0.0 TODO
- add a retry policy to the web API
- handle and respect 429 responses in the web API
- update the remaining models to correctly pull out all properties
- figure out how data-store updates should handle updating objects where a richer object is already present, e.g. the self user is cached on RTM start and then a simplified version of the user object is received and overwrites it
- figure out how to make data-store methods async friendly, e.g. so that a redis data-store could be a thing
- improve the events emitted by the RTM api, e.g. errors etc.
- improve test coverage of the RTM Client API
