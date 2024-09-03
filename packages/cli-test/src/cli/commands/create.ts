import type { ProjectCommandArguments } from '../../types/commands/common_arguments';
import { type SlackCLICommandOptions, SlackCLIProcess } from '../cli-process';

/**
 * `slack create`
 * @returns command output
 */
export const create = async function create(
  args: ProjectCommandArguments & {
    /** @description URL to an app template to use when creating app. */
    template?: string;
    /** @description Branch to use from the provided `template`. */
    branch?: string;
  },
): Promise<string> {
  const cmdOpts: SlackCLICommandOptions = {};
  if ('template' in args) {
    cmdOpts['--template'] = args.template;
    if ('branch' in args) {
      cmdOpts['--branch'] = args.branch;
    }
  }
  const cmd = new SlackCLIProcess(`create ${args.appPath}`, args, cmdOpts);
  const proc = await cmd.execAsync();
  return proc.output;
};

export default create;
