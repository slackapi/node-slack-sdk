import type { SpawnOptionsWithoutStdio } from 'node:child_process';
import type { ShellProcess } from '../types/shell';
import { shell } from './shell';

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
  /** @description Ignore warnings and continue executing command. Defaults to `true`. */
  force?: boolean;
  /**
   * @description Application instance to target. Can be `local`, `deployed` or an app ID string.
   * Defaults to `deployed`.
   */
  app?: 'local' | 'deployed' | string;
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
   * @description The ID of your team. If you are using a Standard Slack plan, this is your workspace ID.
   * If you are using an Enterprise Grid plan, this is the organization ID, even if your app is only granted to a
   * subset of workspaces within the org.
   */
  team?: string;
  /** @description Access token to use when making Slack API calls. */
  token?: string;
  /** @description Print debug logging and additional CLI information. */
  verbose?: boolean;
}

export type SlackCLIHostTargetOptions = Pick<SlackCLIGlobalOptions, 'qa' | 'dev' | 'apihost'>;

export type SlackCLICommandOptions = Record<string, string | boolean | number | undefined>;

export class SlackCLIProcess {
  /**
   * @description The CLI command to invoke
   */
  public command: string[];

  /**
   * @description The global CLI options to pass to the command
   */
  public globalOptions: SlackCLIGlobalOptions | undefined;

  /**
   * @description The CLI command-specific options to pass to the command
   */
  public commandOptions: SlackCLICommandOptions | undefined;

  public constructor(
    command: string[],
    globalOptions?: SlackCLIGlobalOptions,
    commandOptions?: SlackCLICommandOptions,
  ) {
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
    // biome-ignore lint/style/noNonNullAssertion: the constructor checks for the truthiness of this environment variable
    const proc = shell.spawnProcess(process.env.SLACK_CLI_PATH!, cmd, shellOpts);
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
    // biome-ignore lint/style/noNonNullAssertion: the constructor checks for the truthiness of this environment variable
    const proc = shell.spawnProcess(process.env.SLACK_CLI_PATH!, cmd, shellOpts);
    await shell.waitForOutput(output, proc, {
      timeout: shellOpts?.timeout,
    });
    return proc;
  }

  /**
   * @description Executes the command synchronously, returning the process standard output
   */
  public execSync(shellOpts?: Partial<SpawnOptionsWithoutStdio>): string {
    const cmd = this.assembleShellInvocation();
    // biome-ignore lint/style/noNonNullAssertion: the constructor checks for the truthiness of this environment variable
    return shell.runCommandSync(process.env.SLACK_CLI_PATH!, cmd, shellOpts);
  }

  private assembleShellInvocation(): string[] {
    let cmd: string[] = [];
    if (this.globalOptions) {
      const opts = this.globalOptions;
      // Determine API host target
      if (opts.apihost) {
        cmd = cmd.concat(['--apihost', opts.apihost]);
      } else if (opts.qa) {
        cmd = cmd.concat(['--apihost', 'qa.slack.com']);
      } else if (opts.dev) {
        cmd = cmd.concat(['--slackdev']);
      }
      // Always skip update unless explicitly set to something falsy
      if (opts.skipUpdate || opts.skipUpdate === undefined) {
        cmd = cmd.concat(['--skip-update']);
      }
      // Target team
      if (opts.team) {
        cmd = cmd.concat(['--team', opts.team]);
      }
      // App instance; defaults to `deployed`
      if (opts.app) {
        cmd = cmd.concat(['--app', opts.app]);
      } else {
        cmd = cmd.concat(['--app', 'deployed']);
      }
      // Ignore warnings via --force; defaults to true
      if (opts.force || typeof opts.force === 'undefined') {
        cmd = cmd.concat(['--force']);
      }
      // Specifying custom token
      if (opts.token) {
        cmd = cmd.concat(['--token', opts.token]);
      }
      if (opts.verbose) {
        cmd = cmd.concat(['--verbose']);
      }
    } else {
      cmd = cmd.concat(['--skip-update', '--force', '--app', 'deployed']);
    }
    cmd = cmd.concat(this.command);
    if (this.commandOptions) {
      for (const [key, value] of Object.entries(this.commandOptions)) {
        if (key && value) {
          cmd.push(key);
          if (value !== true) {
            cmd.push(String(value));
          }
        }
      }
    }
    return cmd;
  }
}
