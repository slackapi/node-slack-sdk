import type { ProjectCommandArguments } from '../../types/commands/common_arguments';
import { SlackCLIProcess } from '../cli-process';

export interface EnvCommandArguments {
  /** @description Environment variable key */
  secretKey: string;
  /** @description Environment variable value */
  secretValue: string;
}

/**
 * `slack env add`
 * @returns command output
 */
export const add = async function envAdd(args: ProjectCommandArguments & EnvCommandArguments): Promise<string> {
  const cmd = new SlackCLIProcess(`env add ${args.secretKey} ${args.secretValue}`, args);
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
  const cmd = new SlackCLIProcess('env list', args);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack env remove`
 * @returns command output
 */
export const remove = async function envRemove(
  args: ProjectCommandArguments & Pick<EnvCommandArguments, 'secretKey'>,
): Promise<string> {
  const cmd = new SlackCLIProcess(`env remove ${args.secretKey}`, args);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

export default {
  add,
  list,
  remove,
};
