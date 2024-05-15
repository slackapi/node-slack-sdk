export { SlackCLI } from './cli-lib/slack-cli-lib';
export {
  shouldContainString,
  shouldContainStrings,
  shouldNotContainStrings,
} from './utils/assertion-helpers';
export { SlackTracerId } from './utils/constants';

// Check for cli binary path
if (!process.env.SLACK_CLI_PATH) {
  throw new Error('SlackCliLib: SLACK_CLI_PATH is not set');
}
