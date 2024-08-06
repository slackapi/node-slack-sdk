import {
  GroupAccessChangeArguments,
  InfoArgument,
  ProjectCommandArguments,
  UserAccessChangeArguments,
} from '../../types/commands/common_arguments';
import { SlackCLICommandOptions, SlackCLIProcess } from '../cli-process';

type AccessChangeArguments = {
  /** @description `callback_id` of function being targeted. */
  name: string;
  info?: boolean;
} & (GroupAccessChangeArguments | UserAccessChangeArguments);

type FunctionAccessArguments = AccessChangeArguments | InfoArgument;

/**
 * `slack function access`
 * @returns command output
 */
export const access = async function functionAccess(
  args: ProjectCommandArguments & FunctionAccessArguments,
): Promise<string> {
  const cmdOpts: SlackCLICommandOptions = {};
  if ('info' in args && args.info) {
    cmdOpts['--info'] = true;
  } else {
    cmdOpts['--name'] = args.name;
    if ('appCollaborators' in args && args.appCollaborators) {
      cmdOpts['--app-collaborators'] = true;
    } else if ('everyone' in args && args.everyone) {
      cmdOpts['--everyone'] = true;
    } else if ('users' in args) {
      cmdOpts['--users'] = args.users.join(',');
      if ('grant' in args && args.grant) {
        cmdOpts['--grant'] = true;
      } else if ('revoke' in args && args.revoke) {
        cmdOpts['--revoke'] = true;
      } else {
        throw new Error('When granting or revoking function access to users, you must specify one of `grant` or `revoke` as `true`.');
      }
    } else {
      throw new Error('When setting function access, you must specify a target for whom to give access to.');
    }
  }
  const cmd = new SlackCLIProcess('function access', args, cmdOpts);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

export default {
  access,
};
