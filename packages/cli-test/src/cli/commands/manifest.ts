import { ProjectCommandArguments } from '../../types/commands/common_arguments';
import { SlackCLICommandOptions, SlackCLIProcess } from '../cli-process';

/**
 * `slack manifest info`
 * @returns command output
 */
export const info = async function manifestInfo(args: ProjectCommandArguments & {
  /**
   * @description Whether to retrieve manifest from the local `project`, or `remote` from Slack. Defaults to `project`.
   */
  source?: 'project' | 'remote';
}): Promise<string> {
  const cmdOpts: SlackCLICommandOptions = {
    '--source': args.source || 'project',
  };
  const cmd = new SlackCLIProcess('manifest info', args, cmdOpts);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack manifest validate`
 * @returns command output
 */
export const validate = async function manifestValidate(args: ProjectCommandArguments): Promise<string> {
  const cmd = new SlackCLIProcess('manifest validate', args);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

export default {
  info,
  validate,
};
