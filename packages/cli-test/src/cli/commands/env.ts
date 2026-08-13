import type { ProjectCommandArguments } from '../../types/commands/common_arguments';
import { SlackCLIProcess } from '../cli-process';

export interface EnvCommandArguments {
  /** @description Environment variable key */
  secretKey: string;
  /** @description Environment variable value */
  secretValue: string;
}

/**
 * `slack env set`
 * @returns command output
 */
export const set = async function envSet(args: ProjectCommandArguments & EnvCommandArguments): Promise<string> {
  const cmd = new SlackCLIProcess(['env', 'set', args.secretKey, args.secretValue], args);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack env list`
 * @returns command output
 */
export const list = async function envList(args: ProjectCommandArguments): Promise<string> {
  const cmd = new SlackCLIProcess(['env', 'list'], args);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack env unset`
 * @returns command output
 */
export const unset = async function envUnset(
  args: ProjectCommandArguments & Pick<EnvCommandArguments, 'secretKey'>,
): Promise<string> {
  const cmd = new SlackCLIProcess(['env', 'unset', args.secretKey], args);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

export default {
  set,
  list,
  unset,
};
