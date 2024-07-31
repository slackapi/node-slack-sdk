import type { SlackCLIGlobalOptions } from '../../cli/cli-process';

export interface ProjectCommandArguments extends SlackCLIGlobalOptions {
  /**
   * @description Path to the Slack CLI-generated application to run the command in.
   * Sets the `cwd` on the shell process executing the CLI.
   */
  appPath: string;
}
