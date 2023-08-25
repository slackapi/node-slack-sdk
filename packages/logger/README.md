# Slack Logger

The `@slack/logger` package is intended to be used as a simple logging interface that supports verbosity levels.

## Requirements

This package supports Node v18 and higher. It's highly recommended to use [the latest LTS version of
node](https://github.com/nodejs/Release#release-schedule), and the documentation is written using syntax and features
from that version.

## Installation

```shell
$ npm install @slack/logger
```

## Usage

This package exports a `ConsoleLogger` class, a generic `Logger` interface and a `LogLevel` enum.
The source code is short (~150 lines of code), so check out `src/index.ts` for details, but the `ConsoleLogger` API
mimics the default node `console` API with three additions:

- `getLevel()`: returns the currently-specific `LogLevel` of the logger.
- `setLevel(LogLevel)`: sets the `LogLevel` of the logger.
- `setName(string)`: sets a prefix to display in logs. Useful if you have multiple loggers active.

## Getting Help

If you get stuck, we're here to help. The following are the best ways to get assistance working through your issue:

  * [Issue Tracker](http://github.com/slackapi/node-slack-sdk/issues) for questions, feature requests, bug reports and
    general discussion related to this package. Try searching before you create a new issue.
  * [Email us](mailto:developers@slack.com) in Slack developer support: `developers@slack.com`
