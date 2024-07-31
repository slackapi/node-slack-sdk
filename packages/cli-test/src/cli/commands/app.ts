import { SlackCLICommandOptions, SlackCLIProcess } from '../cli-process';

import type { ProjectCommandArguments } from '../../types/commands/common_arguments';

export default {
  /**
   * `slack app delete`
   * @param args command arguments
   * @returns command output
   */
  delete: async function appDelete(args: ProjectCommandArguments & {
  /** @description `--force`; ignores warnings and executes app deletion. Defaults to `true`. */
    force?: boolean;
    /** @description `--app [deployed|local]`; deletes either the deployed or local app. Defaults to `deployed`. */
    app?: 'deployed' | 'local';
  }): Promise<string> {
    const appEnvironment = args.app ? args.app : 'deployed';
    const cmdOpts: SlackCLICommandOptions = {
      '--app': appEnvironment,
    };
    if (typeof args.force === 'undefined' || args.force) {
      cmdOpts['--force'] = true;
    }
    const cmd = new SlackCLIProcess('app delete', args, cmdOpts);
    const proc = await cmd.execAsync({
      cwd: args.appPath,
    });
    return proc.output;
  },
  /**
   * `slack app install`
   * @param args command arguments
   * @returns command output
   */
  install: async function workspaceInstall(args: ProjectCommandArguments): Promise<string> {
    const cmd = new SlackCLIProcess('app install', args);
    const proc = await cmd.execAsync({
      cwd: args.appPath,
    });
    return proc.output;
  },
  /**
   * `slack app list`
   * @param appPath path to app
   * @returns command output
   */
  list: async function appList(args: ProjectCommandArguments): Promise<string> {
    const cmd = new SlackCLIProcess('app list', args);
    const proc = await cmd.execAsync({
      cwd: args.appPath,
    });
    return proc.output;
  },
};
