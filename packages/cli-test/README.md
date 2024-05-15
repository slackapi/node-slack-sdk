# @slack/cli-test-util

This library is designed to automate [Slack Command Line Interface](https://api.slack.com/automation/quickstart) (CLI) methods. It provides a simplified and programmatic way to interact with the CLI and is used primarily for E2E testing.

# Requirements

-   Ensure the [Slack Command Line Interface](https://api.slack.com/automation/quickstart) is installed on your system

# Quickstart guide

1. Install the package

```bash
npm install @slack/cli-test-util
```

2. Set the path to the CLI executable using the environment variable `SLACK_CLI_PATH`
    - supply a link to a binary on the global path, like `slack-cli`
    - it will default to using `slack` otherwise
    - slack cli must be installed separately
3. Import and use `SlackCLILib`, `VerificationHelper` or `SlackTracerId`

```ts
import { SlackCLILib } from '@slack/cli-test-util';
...
const actualOutput = await SlackCLILib.runSimpleCommand('echo "hi"');
```

# How to use the package

1. SlackCLILib - contains all methods to interact with cli
    - methods named after slack cli methods, e.g. `SlackCLILib.deploy()`
2. VerificationHelper - helper methods to verify cli output
    - shouldContainString
    - shouldContainStrings
    - shouldNotContainStrings
3. SlackTracerId - trace IDs to verify cli command output
    - see available exported IDs on SlackTracerId object
    - to enable: `SLACK_TEST_TRACE=true`

```ts
// Import avialable objects from the package
import { SlackCLILib, SlackTracerId, VerificationHelper } from 'slack-cli-test-util';

describe('CLI - Feedback', () => {
	// Create a variable with a link to cli binary installed on your machine
	const cli = process.env.SLACK_CLI_PATH;

	it('can successfully follow the feedback survey link', async function () {
		// Create command
		const command = `${cli} feedback`;

		// Collect actual output from the command
		const actual = await SlackCLILib.runSimpleCommand(command);

		// Set expected array of strings
		const expected = [
			// Expected string
			'Feedback survey',
			// Available trace
			SlackTracerId.SLACK_TRACE_FEEDBACK_MESSAGE
		];

		// Check results with helper command
		await VerificationHelper.shouldContainStrings(actual, expected, command);
	});
});
```

## Configuration

| EnvVar                | Required | Note                                                                           |
| --------------------- | -------- | ------------------------------------------------------------------------------ |
| `SLACK_CLI_PATH`      | yes      | path to Slack CLI binary                                                       |
| `SLACK_CLI_LOG_LEVEL` | no       | default: `info`. [Logger levels](https://github.com/winstonjs/winston#logging) |
