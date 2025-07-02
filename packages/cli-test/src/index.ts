export { SlackCLI } from './cli';
export { SlackCLIProcess } from './cli/cli-process';
export { shell } from './cli/shell';
export { SlackProduct, SlackTracerId } from './utils/constants';

// Check for cli binary path
if (!process.env.SLACK_CLI_PATH) {
  throw new Error('Environment variable `SLACK_CLI_PATH` is not set!');
}
