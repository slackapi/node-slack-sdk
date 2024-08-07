import { SlackCLIProcess } from '../cli-process';

import type { ProjectCommandArguments } from '../../types/commands/common_arguments';

/**
 * `slack app delete`
 * @returns command output
 */
export const del = async function appDelete(args: ProjectCommandArguments): Promise<string> {
  const cmd = new SlackCLIProcess('app delete', args);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack app install`
 * @returns command output
 */
export const install = async function workspaceInstall(args: ProjectCommandArguments): Promise<string> {
  const cmd = new SlackCLIProcess('app install', args);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack app list`
 * @returns command output
 */
export const list = async function appList(args: ProjectCommandArguments): Promise<string> {
  const cmd = new SlackCLIProcess('app list', args);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

export default {
  delete: del,
  install,
  list,
};
