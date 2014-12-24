# Node.js Slack Client Library

## Travis-CI Build Status

[![Build Status](https://travis-ci.org/slackhq/node-slack-client.png?branch=master)](https://travis-ci.org/slackhq/node-slack-client)

## Description

This is a Slack client library for Node.js. It is intended to expose all of the functionality of [Slack's Real Time Messaging API](https://api.slack.com/rtm) while providing some common abstractions and generally making your life easier, if you want it to.

This code has been built to support our [hubot-slack](https://github.com/slackhq/hubot-slack) adapter. Most other functionality isn't yet supported, and documentation is minimal, at best. A simple example of how to use this module from Node.js can be found in the `examples` directory.

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

## TODOs

1. Better/any timeouts on initial websocket connection
2. Better/any timeouts on API calls
3. Document the connection options, etc
4. Emit more events around unreads and mentions
