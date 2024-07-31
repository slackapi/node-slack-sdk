import { ProjectCommandArguments } from '../../types/commands/common_arguments';
import { SlackCLIProcess } from '../cli-process';

/**
 * `slack collaborators add`
 * @returns command output
 */
export const add = async function collaboratorsAdd(args: ProjectCommandArguments & {
  /** @description email of the user to be added as a collaborator */
  collaboratorEmail: string,
}): Promise<string> {
  const cmd = new SlackCLIProcess(`collaborators add ${args.collaboratorEmail}`, args);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack collaborators list`
 * @param appPath path to app
 * @param teamFlag team domain to list collaborators for
 * @returns command output
 */
export const list = async function collaboratorsList(
  appPath: string,
  teamFlag: string,
  options?: { qa?: boolean },
): Promise<string> {
  // TODO: (breaking change) separate parameters vs single-param-object
  const cmd = new SlackCLIProcess('collaborators list', { team: teamFlag, qa: options?.qa });
  const proc = await cmd.execAsync({
    cwd: appPath,
  });
  return proc.output;
};

/**
 * `slack collaborators remove`
 * @param appPath path to app
 * @param teamFlag team domain to remove collaborators from
 * @param collaboratorEmail email of the user to be removed as a collaborator
 * @returns command output
 */
export const remove = async function collaboratorsRemove(
  appPath: string,
  teamFlag: string,
  collaboratorEmail: string,
  options?: { qa?: boolean },
): Promise<string> {
  // TODO: (breaking change) separate parameters vs single-param-object
  const cmd = new SlackCLIProcess(`collaborators remove ${collaboratorEmail}`, { team: teamFlag, qa: options?.qa });
  const proc = await cmd.execAsync({
    cwd: appPath,
  });
  return proc.output;
};

// TODO: (breaking change): rename properties of this default export to match actual command names
export default {
  collaboratorsAdd: add,
  collaboratorsList: list,
  collaboratorsRemove: remove,
};
