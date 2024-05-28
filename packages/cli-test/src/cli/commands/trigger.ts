import { SlackCLIProcess } from '../cli-process';
import commandError from '../command-error';

// TODO: the "flag" param throughout here should be done in a better way.
// Perhaps expose the SlackCommandOptions type directly?

/**
 * `slack trigger access`
 * @param appPath path to app
 * @param teamFlag team domain of the updating trigger
 * @param flags specification of trigger access, e.g. --trigger-id Ft0143UPTAV8 --everyone
 * @returns command output
 */
export const access = async function triggerAccess(
  appPath: string,
  teamFlag: string,
  flags: string,
  options?: { qa?: boolean },
): Promise<string> {
  // TODO: (breaking change) separate params vs. single-param-object
  // TODO: access requires --trigger-id so add that to parameters (breaking change)
  const cmd = new SlackCLIProcess(`trigger access ${flags}`, { team: teamFlag, qa: options?.qa });
  try {
    const proc = await cmd.execAsync({
      cwd: appPath,
    });
    return proc.output;
  } catch (error) {
    throw commandError(error, 'triggerAccess');
  }
};
/**
 * `slack trigger create`
 * @returns command output
 */
export const create = async function triggerCreate({
  appPath,
  teamFlag,
  flag,
  orgWorkspaceGrantFlag,
  options,
}: {
  /** path to app */
  appPath: string;
  /** team domain where the trigger will be created */
  teamFlag: string;
  /** any additional flags to provide i.e. method of trigger creation + ref, e.g. --trigger-def triggers/add-pin.json */
  flag: string;
  /** supplies additional workspace within an org to grant app access to as part of install */
  orgWorkspaceGrantFlag?: string;
  options?: { // TODO: must be a better way of exposing these options
    /** Local app for local run sessions */
    localApp?: boolean;
    /** Whether to run against --slackdev or production */
    qa?: boolean;
  };
}): Promise<string> {
  const appEnvironment = options?.localApp ? 'local' : 'deployed';
  const cmd = new SlackCLIProcess(`trigger create ${flag}`, { team: teamFlag, qa: options?.qa }, {
    '--app': appEnvironment,
    '--org-workspace-grant': orgWorkspaceGrantFlag,
  });
  try {
    const proc = await cmd.execAsync({
      cwd: appPath,
    });
    return proc.output;
  } catch (error) {
    throw commandError(error, 'triggerCreate');
  }
};

/**
 * `slack trigger delete`
 * @param appPath path to the app
 * @param teamFlag team domain to delete trigger from
 * @param flag
 * @returns command output
 */
export const del = async function triggerDelete(
  appPath: string,
  teamFlag: string,
  flag: string,
  options?: { qa?: boolean },
): Promise<string> {
  // TODO: (breaking change) separate params vs. single-param-object
  // TODO: delete requires --trigger-id so add that to parameters (breaking change)
  const cmd = new SlackCLIProcess(`trigger delete ${flag}`, { team: teamFlag, qa: options?.qa });
  try {
    const proc = await cmd.execAsync({
      cwd: appPath,
    });
    return proc.output;
  } catch (error) {
    throw commandError(error, 'triggerDelete');
  }
};

/**
 * `slack trigger info`
 * @param appPath path to the app
 * @param teamFlag team domain of the trigger
 * @param flag arbitrary additional flags
 * @returns command output
 */
export const info = async function triggerInfo(
  appPath: string,
  teamFlag: string,
  flag: string,
  options?: { qa?: boolean },
): Promise<string> {
  // TODO: getting trigger info necessitates passing a trigger ID, so that should be exposed in the parameters here
  // TODO: (breaking change) separate params vs. single-param-object
  const cmd = new SlackCLIProcess(`trigger info ${flag}`, { team: teamFlag, qa: options?.qa });
  try {
    const proc = await cmd.execAsync({
      cwd: appPath,
    });
    return proc.output;
  } catch (error) {
    throw commandError(error, 'triggerInfo');
  }
};

/**
 * `slack trigger list`
 * @param appPath path to app
 * @param teamFlag team domain for listing all triggers
 * @param flag arbitrary additional flags to pass
 * @returns command output
 */
export const list = async function triggerList(
  appPath: string,
  teamFlag: string,
  flag: string,
  options?: { qa?: boolean },
): Promise<string> {
  // TODO: (breaking change) separate params vs. single-param-object
  const cmd = new SlackCLIProcess(`trigger list ${flag}`, { team: teamFlag, qa: options?.qa });
  try {
    const proc = await cmd.execAsync({
      cwd: appPath,
    });
    return proc.output;
  } catch (error) {
    throw commandError(error, 'triggerList');
  }
};

/**
 * `slack trigger update`
 * @param appPath path to the app
 * @param teamFlag team domain for the updating trigger
 * @param flag arbitrary additional flags to pass to command
 * @returns command output
 */
export const update = async function triggerUpdate(
  appPath: string,
  teamFlag: string,
  flag: string,
  options?: { qa?: boolean },
): Promise<string> {
  // TODO: (breaking change) separate params vs. single-param-object
  const cmd = new SlackCLIProcess(`trigger update ${flag}`, { team: teamFlag, qa: options?.qa });
  try {
    const proc = await cmd.execAsync({
      cwd: appPath,
    });
    return proc.output;
  } catch (error) {
    throw commandError(error, 'triggerUpdate');
  }
};

// TODO: (breaking change): rename properties of this default export to match actual command names
export default {
  triggerAccess: access,
  triggerCreate: create,
  triggerDelete: del,
  triggerInfo: info,
  triggerList: list,
  triggerUpdate: update,
};
