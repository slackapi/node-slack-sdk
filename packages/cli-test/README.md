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
3. Import and use `SlackCLI`, `SlackTracerId` or any of the assertion helper functions (`should*`) exported by this package

```ts
import { SlackCLI } from '@slack/cli-test';
...
const actualOutput = await SlackCLI.runSimpleCommand('echo "hi"');
```

# API / Usage

This package exports the following:

1. `SlackCLI` - an object containing a variety of methods to interact with the CLI
  - methods are named after [Slack CLI commands][commands], e.g. `SlackCLI.deploy()`
2. Assertion helper methods to verify process output:
  - `shouldContainString`
  - `shouldContainStrings`
  - `shouldNotContainStrings`
3. `SlackTracerId` - trace IDs to verify CLI command output
  - see available exported IDs on `SlackTracerId` object
  - to enable the CLI to show this output, ensure any CLI commands are executed with the following environment variable set: `SLACK_TEST_TRACE=true`

```ts
// Import available objects from the package
import { SlackCLI, SlackTracerId, shouldContainStrings } from '@slack/cli-test';

describe('CLI - Feedback', () => {
  // Create a variable with a link to cli binary installed on your machine
  const cli = process.env.SLACK_CLI_PATH;

  it('can successfully follow the feedback survey link', async function () {
    // Create command
    const command = `${cli} feedback`;

    // Collect actual output from the command
    const actual = await SlackCLI.runSimpleCommand(command);

    // Set expected array of strings
    const expected = [
	    // Expected string
	    'Feedback survey',
	    // Available trace
	    SlackTracerId.SLACK_TRACE_FEEDBACK_MESSAGE
    ];

    // Check results with helper command
    shouldContainStrings(actual, expected, command);
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
