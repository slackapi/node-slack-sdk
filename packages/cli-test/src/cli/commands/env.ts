import { SlackCLIProcess } from '../cli-process';
import commandError from '../command-error';

/**
 * `slack env add`
 * @param appPath path to app
 * @param teamFlag team domain to add env var to
 * @param secretKey environment variable key
 * @param secretValue environment variable value
 * @returns command output
 */
export const add = async function envAdd(
  appPath: string,
  teamFlag: string,
  secretKey: string,
  secretValue: string,
  options?: { qa?: boolean },
): Promise<string> {
  // TODO: (breaking change) separate parameters vs single-param-object
  const cmd = new SlackCLIProcess(`env add ${secretKey} ${secretValue}`, { team: teamFlag, qa: options?.qa });
  try {
    const proc = await cmd.execAsync({
      cwd: appPath,
    });
    return proc.output;
  } catch (error) {
    throw commandError(error, 'envAdd');
  }
};

/**
 * `slack env list`
 * @param appPath path to app
 * @param teamFlag team domain to list env vars for
 * @returns command output
 */
export const list = async function envList(
  appPath: string,
  teamFlag: string,
  options?: { qa?: boolean },
): Promise<string> {
  // TODO: (breaking change) separate parameters vs single-param-object
  const cmd = new SlackCLIProcess('env list', { team: teamFlag, qa: options?.qa });
  try {
    const proc = await cmd.execAsync({
      cwd: appPath,
    });
    return proc.output;
  } catch (error) {
    throw commandError(error, 'envList');
  }
};

/**
 * `slack env remove`
 * @param appPath path to app
 * @param teamFlag team domain to remove env var from
 * @param secretKey environment variable key
 * @returns command output
 */
export const remove = async function envRemove(
  appPath: string,
  teamFlag: string,
  secretKey: string,
  options?: { qa?: boolean },
): Promise<string> {
  // TODO: (breaking change) separate parameters vs single-param-object
  const cmd = new SlackCLIProcess(`env remove ${secretKey}`, { team: teamFlag, qa: options?.qa });
  try {
    const proc = await cmd.execAsync({
      cwd: appPath,
    });
    return proc.output;
  } catch (error) {
    throw commandError(error, 'envRemove');
  }
};

// TODO: (breaking change): rename properties of this default export to match actual command names
export default {
  envAdd: add,
  envList: list,
  envRemove: remove,
};
