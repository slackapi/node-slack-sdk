import { SlackCLIProcess } from '../cli-process';
import commandError from '../command-error';

/**
 * `slack external-auth`
 * @param appPath path to app
 * @param teamFlag team domain of the relevant app
 * @param provider provider to add external auth for
 * @param flags specification of external-auth, e.g. add or add-secret
 * @returns command output
 */
export const externalAuth = async function externalAuth(
  appPath: string,
  teamFlag: string,
  provider: string,
  flags: string,
  options?: { qa?: boolean },
): Promise<string> {
  // TODO: (breaking change) separate parameters vs single-param-object
  // TODO: this is a generic entry point to the `external-auth` suite of commands, and today `flags` is abused to
  // specify the actual sub-command. easy, but lazy, not sure if best approach
  const cmd = new SlackCLIProcess(`external-auth ${flags}`, { team: teamFlag, qa: options?.qa }, {
    '--provider': provider,
  });
  try {
    const proc = await cmd.execAsync({
      cwd: appPath,
    });
    return proc.output;
  } catch (error) {
    throw commandError(error, 'externalAuth');
  }
};

export default {
  externalAuth,
};
