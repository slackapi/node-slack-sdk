import { ProjectCommandArguments } from '../../types/commands/common_arguments';
import { SlackCLIProcess } from '../cli-process';

export interface CollaboratorEmail {
  /** @description email of the collaborator */
  collaboratorEmail: string,
}

/**
 * `slack collaborators add`
 * @returns command output
 */
export const add = async function collaboratorsAdd(args: ProjectCommandArguments & CollaboratorEmail): Promise<string> {
  const cmd = new SlackCLIProcess(`collaborators add ${args.collaboratorEmail}`, args);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack collaborators list`
 * @returns command output
 */
export const list = async function collaboratorsList(args: ProjectCommandArguments): Promise<string> {
  const cmd = new SlackCLIProcess('collaborators list', args);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack collaborators remove`
 * @param collaboratorEmail email of the user to be removed as a collaborator
 * @returns command output
 */
export const remove = async function collaboratorsRemove(
  args: ProjectCommandArguments & CollaboratorEmail,
): Promise<string> {
  const cmd = new SlackCLIProcess(`collaborators remove ${args.collaboratorEmail}`, args);
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
