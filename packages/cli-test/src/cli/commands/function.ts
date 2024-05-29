import { SlackCLIProcess } from '../cli-process';
import commandError from '../command-error';

// TODO: the "flag" param throughout here should be done in a better way.
// Perhaps expose the SlackCommandOptions type directly?

/**
 * `slack function access`
 * @param appPath path to app
 * @param teamFlag team domain for the function's app
 * @param flags specification of function distribution, i.e. --name greeting_function --app-collaborators
 * @returns command output
 */
export const access = async function functionAccess(
  appPath: string,
  teamFlag: string,
  flags: string,
  options?: { qa?: boolean },
): Promise<string> {
  // TODO: breaking change, separate params vs single-param-object
  const cmd = new SlackCLIProcess(`function access ${flags}`, { team: teamFlag, qa: options?.qa });
  try {
    const proc = await cmd.execAsync({
      cwd: appPath,
    });
    return proc.output;
  } catch (error) {
    throw commandError(error, 'functionAccess');
  }
};

// TODO: (breaking change): rename properties of this default export to match actual command names
export default {
  functionDistribute: access, // TODO: brekaing change remove this, is now called 'function access'
  functionAccess: access,
};
