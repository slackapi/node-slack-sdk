import { SlackCLIProcess } from '../cli-process';
import commandError from '../command-error';

/**
 * `slack app delete`
 * @param appPath path to app
 * @param teamFlag team domain for the function's app
 * @returns command output
 */
export const del = async function appDelete(
  appPath: string,
  teamFlag: string,
  options?: { isLocalApp?: boolean, qa?: boolean },
): Promise<string> {
  // TODO: breaking change, separate params vs single-param-object, probably should reflect global vs command CLI flags
  const appEnvironment = options?.isLocalApp ? 'local' : 'deployed';
  const cmd = new SlackCLIProcess('app delete --force', { team: teamFlag, qa: options?.qa }, {
    '--app': appEnvironment,
  });
  try {
    const proc = await cmd.execAsync({
      cwd: appPath,
    });
    return proc.output;
  } catch (error) {
    throw commandError(error, 'appDelete');
  }
};

/**
 * `slack app install`
 * @param appPath path to app
 * @param teamFlag team domain where the app will be installed
 * @returns command output
 */
export const install = async function workspaceInstall(
  appPath: string,
  teamFlag: string,
  options?: { qa?: boolean },
): Promise<string> {
  // TODO: breaking change, separate params vs single-param-object, probably should reflect global vs command CLI flags
  const cmd = new SlackCLIProcess('app install', { team: teamFlag, qa: options?.qa });
  try {
    const proc = await cmd.execAsync({
      cwd: appPath,
    });
    return proc.output;
  } catch (error) {
    throw commandError(error, 'appInstall');
  }
};

/**
 * `slack app list`
 * @param appPath path to app
 * @returns command output
 */
export const list = async function appList(
  appPath: string,
  options?: { qa?: boolean },
): Promise<string> {
  // TODO: (breaking change) separate parameters vs single-param-object
  const cmd = new SlackCLIProcess('app list', options);
  try {
    const proc = await cmd.execAsync({
      cwd: appPath,
    });
    return proc.output;
  } catch (error) {
    throw commandError(error, 'appList');
  }
};

// TODO: (breaking change): rename properties of this default export to match actual command names
export default {
  workspaceDelete: del,
  workspaceInstall: install,
  workspaceList: list,
};
