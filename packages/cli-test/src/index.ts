export { SlackCLI } from './cli';
export { SlackCLIProcess } from './cli/cli-process';
export { SlackTracerId, SlackProduct } from './utils/constants';
export { shell } from './cli/shell';

// Check for cli binary path
if (!process.env.SLACK_CLI_PATH) {
  throw new Error('Environment variable `SLACK_CLI_PATH` is not set!');
}
