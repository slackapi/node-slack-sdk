# @slack/cli-test

[![codecov](https://codecov.io/gh/slackapi/node-slack-sdk/graph/badge.svg?token=OcQREPvC7r&flag=cli-test)](https://codecov.io/gh/slackapi/node-slack-sdk)

This library is designed to automate the [Slack Platform Command Line Interface][cli] (CLI). It provides a programmatic way to interact with the CLI using node.js and is used primarily for end-to-end (E22) testing.

# Requirements

1. Ensure the [Slack CLI][cli] is installed on your system.
2. Export the path to the CLI binary as a `SLACK_CLI_PATH` environment variable.

# Quickstart

1. Install the package

```bash
npm install @slack/cli-test
```

2. Set the path to the CLI executable using the environment variable `SLACK_CLI_PATH`
    - supply a link to a binary on the global path, like `slack-cli`
    - it will default to using `slack` otherwise
3. Import and use `SlackCLI` to automate the CLI!

```ts
import { SlackCLI } from '@slack/cli-test';
...
const createOutput = await SlackCLI.createAppFromTemplate('slackapi/deno-hello-world');
```

# API / Usage

This package exports the following:

1. `SlackCLI` - an object containing a variety of methods to interact with the CLI
  - methods are named after [Slack CLI commands][commands], e.g. `SlackCLI.deploy()`
2. `SlackCLIProcess` - a class that can be instantiated that exposes the ability to run arbitrary commands, with optional global flags as well as command-specific flags.
3. `SlackTracerId` - trace IDs to verify CLI command output
  - see available exported IDs on `SlackTracerId` object
  - to enable the CLI to show this output, any CLI commands executed by this library are invoked with the environment variable set: `SLACK_TEST_TRACE=true`

```ts
// Import available objects from the package
import { SlackCLI, SlackTracerId } from '@slack/cli-test';

describe('Login with the CLI', () => {
  it('can successfully follow the feedback survey link', async function () {
    // `login --no-prompt` to get challenge
    const loginChallengeResult = await SlackCLI.loginNoPrompt();

    // Submit auth ticket in Slack UI
    const challenge = await submitCLIAuthTicket(
      loginUrlToMyWorkspace,
      loginChallengeResult.authTicketSlashCommand
    );

    // login with challenge and auth ticket
    const loginChallengeExchangeResult = await SlackCLI.loginChallengeExchange(
      challenge,
      loginChallengeResult.authTicket
    );
  });
});
```

## Configuration

| Environment Variable  | Required | Note                                                                           |
| --------------------- | -------- | ------------------------------------------------------------------------------ |
| `SLACK_CLI_PATH`      | yes      | path to Slack CLI binary                                                       |
| `SLACK_CLI_LOG_LEVEL` | no       | default: `info`. [Logger levels](https://github.com/winstonjs/winston#logging) |

[cli]: https://api.slack.com/automation/quickstart
[commands]: https://api.slack.com/automation/cli/commands
