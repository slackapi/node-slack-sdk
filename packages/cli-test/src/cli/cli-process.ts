import { shell } from './shell';
import type { ShellProcess } from '../utils/types';
/*
 * some parameters used in the 'shell' calls that are CLI-specific and probably should not exist there:
  * @param skipUpdate skip auto update notification
  */

interface SlackCLIGlobalOptions {
  /**
   * @description Whether the command should interact with dev.slack (`--slackdev`)
   */
  dev?: boolean;
  /**
   * @description Whether the command should interact with dev.slack (`--slackdev`)
   */
  qa?: boolean;
  /**
   * @description Whether the CLI should skip updating (`--skip-update`). Defaults to `true`.
   */
  skipUpdate?: boolean;
}

type SlackCLICommandOptions = Record<string, string | null>;

export class SlackCLIProcess {
  /**
   * @description The CLI command to invoke
   */
  public command: string;

  /**
   * @description The global CLI options to pass to the command
   */
  public globalOptions: SlackCLIGlobalOptions | undefined;

  /**
   * @description The CLI command-specific options to pass to the command
   */
  public commandOptions: SlackCLICommandOptions | undefined;

  public constructor(command: string, globalOptions?: SlackCLIGlobalOptions, commandOptions?: SlackCLICommandOptions) {
    if (!process.env.SLACK_CLI_PATH) {
      throw new Error('`SLACK_CLI_PATH` environment variable not found! Aborting!');
    }
    this.command = command;
    this.globalOptions = globalOptions;
    this.commandOptions = commandOptions;
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
    let cmd = `${process.env.SLACK_CLI_PATH}`;
    if (this.globalOptions) {
      const opts = this.globalOptions;
      if (opts.qa || opts.dev) {
        cmd += ' --slackdev';
      }
      if (opts.skipUpdate) {
        cmd += ' --skip-update';
      }
    } else {
      cmd += ' --skip-update';
    }
    cmd += ` ${this.command}`;
    if (this.commandOptions) {
      Object.entries(this.commandOptions).forEach(([key, value]) => {
        if (key) {
          cmd += ` ${key}`;
          if (value !== null) {
            cmd += ` ${value}`;
          }
        }
      });
    }
    return cmd;
  }
}
