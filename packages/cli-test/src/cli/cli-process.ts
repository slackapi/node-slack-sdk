import { shell } from './shell';

import type { ShellProcess } from '../types/shell';
import type { SpawnOptionsWithoutStdio } from 'node:child_process';

export interface SlackCLIGlobalOptions {
  /**
   * @description The API host the command should interact with, full domain name. (`--apihost qa1234.slack.com`)
   * Takes precendence over `qa` and `dev` options.
   * @example `qa1234.slack.com` or `dev2345.slack.com`
   */
  apihost?: string;
  /**
   * @description Whether the command should interact with dev.slack (`--slackdev`)
   * `qa` and `apihost` will both supersede this option.
   */
  dev?: boolean;
  /**
   * @description Whether the command should interact with qa.slack (`--apihost qa.slack.com`)
   * Takes precendence over `dev` option but is superseded by `apihost`.
   */
  qa?: boolean;
  /**
   * @description Whether the CLI should skip updating (`--skip-update`). Defaults to `true`.
   */
  skipUpdate?: boolean;
  /**
   * @description workspace or organization name or ID to scope command to
   */
  team?: string;
}

export type SlackCLICommandOptions = Record<string, string | boolean | undefined>;

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
  public async execAsync(shellOpts?: Partial<SpawnOptionsWithoutStdio>): Promise<ShellProcess> {
    const cmd = this.assembleShellInvocation();
    const proc = shell.spawnProcess(cmd, shellOpts);
    await shell.checkIfFinished(proc);
    return proc;
  }

  /**
   * @description Executes the command asynchronously, returning the process details once the process finishes executing
   */
  public async execAsyncUntilOutputPresent(
    output: string,
    shellOpts?: Partial<SpawnOptionsWithoutStdio>,
  ): Promise<ShellProcess> {
    const cmd = this.assembleShellInvocation();
    const proc = shell.spawnProcess(cmd, shellOpts);
    await shell.waitForOutput(output, proc);
    return proc;
  }

  /**
   * @description Executes the command synchronously, returning the process standard output
   */
  public execSync(shellOpts?: Partial<SpawnOptionsWithoutStdio>): string {
    const cmd = this.assembleShellInvocation();
    return shell.runCommandSync(cmd, shellOpts);
  }

  private assembleShellInvocation(): string {
    let cmd = `${process.env.SLACK_CLI_PATH}`;
    if (this.globalOptions) {
      const opts = this.globalOptions;
      if (opts.apihost) {
        cmd += ` --apihost ${opts.apihost}`;
      } else if (opts.qa) {
        cmd += ' --apihost qa.slack.com';
      } else if (opts.dev) {
        cmd += ' --slackdev';
      }
      if (opts.skipUpdate || opts.skipUpdate === undefined) {
        cmd += ' --skip-update';
      }
      if (opts.team) {
        cmd += ` --team ${opts.team}`;
      }
    } else {
      cmd += ' --skip-update';
    }
    cmd += ` ${this.command}`;
    if (this.commandOptions) {
      Object.entries(this.commandOptions).forEach(([key, value]) => {
        if (key && value) {
          cmd += ` ${key}`;
          if (value !== true) {
            cmd += ` ${value}`;
          }
        }
      });
    }
    return cmd;
  }
}
