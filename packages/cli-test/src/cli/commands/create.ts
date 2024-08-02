import { ProjectCommandArguments } from '../../types/commands/common_arguments';
import { SlackCLIProcess } from '../cli-process';

/**
 * `slack create`
 * @returns command output
 */
export const create = async function create(args: ProjectCommandArguments): Promise<string> {
  const cmd = new SlackCLIProcess(`create ${args.appPath}`, args);
  const proc = await cmd.execAsync();
  return proc.output;
};

export default create;
