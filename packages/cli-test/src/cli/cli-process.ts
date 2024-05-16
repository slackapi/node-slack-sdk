import { shell } from './shell';
import type { ShellProcess } from '../utils/types';
/*
 * some parameters used in the 'shell' calls that are CLI-specific and probably should not exist there:
  * @param skipUpdate skip auto update notification
  */

interface GlobalSlackCLIOptions {
  /**
   * @description Whether the command should interact with dev.slack
   */
  qa?: boolean;
  /**
   * @description Whether the command should interact with dev.slack
   */
  dev?: boolean;
}

export class SlackCLIProcess {
  /**
   * @description The CLI command to invoke
   */
  public command: string;

  /**
   * @description The global CLI options associated with the command
   */
  public globalOptions: GlobalSlackCLIOptions | undefined;

  public constructor(command: string, options?: GlobalSlackCLIOptions) {
    if (!process.env.SLACK_CLI_PATH) {
      throw new Error('`SLACK_CLI_PATH` environment variable not found! Aborting!');
    }
    this.command = command;
    this.globalOptions = options;
  }

  /**
   * @description Executes the command asynchronously, returning the process details once the process finishes executing
   */
  public async execAsync(): Promise<ShellProcess> {
    const cmd = this.assembleShellInvocation();
    const proc = await shell.runCommandAsync(cmd);
    await shell.checkIfFinished(proc);
    return proc;
  }

  private assembleShellInvocation(): string {
    let cmd = `${process.env.SLACK_CLI_PATH} ${this.command}`;
    if (this.globalOptions) {
      const opts = this.globalOptions;
      if (opts.qa || opts.dev) {
        cmd += ' --slackdev';
      }
    }
    return cmd;
  }
}
