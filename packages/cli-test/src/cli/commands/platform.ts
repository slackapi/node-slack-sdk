import { SlackTracerId } from '../../utils/constants';
import logger from '../../utils/logger';
import { SlackCLIProcess } from '../cli-process';
import commandError from '../command-error';
import { shell } from '../shell';

import type { ShellProcess } from '../../utils/types';

// TODO: the options for these methods could be DRYed up

export default {
  /**
   * `slack platform activity`
   * @param flag
   * @returns command output
   */
  activity: async function activity({
    appPath,
    teamFlag,
    flag,
    localApp = true,
    qa = false,
  }: {
    /** Path to app */
    appPath: string;
    /** workspace or organization name or ID to deploy the app to */
    teamFlag: string;
    /** Arbitrary flags to provide to the command */
    flag?: string;
    /** Whether to operate on the local or deployed app */
    localApp?: boolean; // TODO: this option is provided inconsistently across commands (breaking change)
    /** Whether to operate against --slackdev or production */
    qa?: boolean; // TODO: this option is provided inconsistently across commands (breaking change)
  }): Promise<string> {
    const appEnvironment = localApp ? 'local' : 'deployed';
    const cmd = new SlackCLIProcess(`activity ${flag}`, { team: teamFlag, qa }, {
      '--app': appEnvironment,
    });
    try {
      const proc = await cmd.execAsync({
        cwd: appPath,
      });
      return proc.output;
    } catch (error) {
      throw commandError(error, 'activity');
    }
  },

  /**
   * waits for a specified sequence then returns the shell
   * At the specific point where the sequence is found to continue with test
   * @returns command output
   */
  activityTailStart: async function activityTailStart({
    appPath,
    teamFlag,
    stringToWaitFor,
    localApp = true,
    qa = false,
  }: {
    /** Path to app */
    appPath: string;
    /** workspace or organization name or ID to deploy the app to */
    teamFlag: string;
    /** expected string to be present in the output before this function returns */
    stringToWaitFor: string;
    /** Whether to operate on the local or deployed app */
    localApp?: boolean;
    /** Whether to operate against --slackdev or production */
    qa?: boolean; // TODO: this option is provided inconsistently across commands (breaking change)
  }): Promise<ShellProcess> {
    const appEnvironment = localApp ? 'local' : 'deployed';
    const cmd = new SlackCLIProcess('activity --tail', { team: teamFlag, qa }, {
      '--app': appEnvironment,
    });
    try {
      const proc = await cmd.execAsyncUntilOutputPresent(stringToWaitFor, {
        cwd: appPath,
      });
      return proc;
    } catch (error) {
      throw commandError(error, 'activityTailStart');
    }
  },

  /**
   * waits for a specified string in the `activity` output, kills the process then returns the output
   * @returns command output
   */
  activityTailStop: async function activityTailStop({
    /** The ShellProcess to check */
    proc,
    stringToWait,
  }: {
    proc: ShellProcess;
    /** expected string to be present in the output before process is killed */
    stringToWait: string;
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      // Wait for output
      shell.waitForOutput(stringToWait, proc).then(() => {
        // kill the shell process
        shell.kill(proc).then(() => {
          resolve(proc.output);
        }, (err) => {
          const msg = `activityTailStop command failed to kill process: ${err}`;
          logger.warn(msg);
          reject(new Error(msg));
        });
      }, reject);
    });
  },

  /**
   * `slack deploy`
   */
  deploy: async function deploy({
    appPath,
    teamFlag,
    hideTriggers = true,
    orgWorkspaceGrantFlag,
    qa = false,
  }: {
    /** Path to app */
    appPath: string;
    /** workspace or organization name or ID to deploy the app to */
    teamFlag: string;
    /** hides output and prompts related to triggers. Defaults to `true`. */
    hideTriggers?: boolean;
    /**
     * Org workspace ID, or the string `all` to request access to all workspaces in the org,
     * to request grant access to in AAA scenarios
     */
    orgWorkspaceGrantFlag?: string;
    /** Whether to operate against --slackdev or production */
    qa?: boolean; // TODO: this option is provided inconsistently across commands (breaking change)
  }): Promise<string> {
    const cmd = new SlackCLIProcess('deploy', { team: teamFlag, qa }, {
      '--hide-triggers': hideTriggers,
      '--org-workspace-grant': orgWorkspaceGrantFlag,
    });
    try {
      const proc = await cmd.execAsync({
        cwd: appPath,
      });
      return proc.output;
    } catch (error) {
      throw commandError(error, 'deploy');
    }
  },

  /**
   * start `slack run`
   * - `runStop` must be used to stop `run` process
   * @returns shell object to kill it explicitly in the test case
   */
  runStart: async function runStart({
    appPath,
    teamFlag,
    cleanup = true,
    hideTriggers = true,
    orgWorkspaceGrantFlag,
    qa = false,
  }: {
    /** Path to app */
    appPath: string;
    /** workspace or organization name or ID to deploy the app to */
    teamFlag: string;
    /** delete the app after `run` completes */
    cleanup?: boolean;
    /** hides output and prompts related to triggers. Defaults to `true`. */
    hideTriggers?: boolean;
    /**
     * Org workspace ID, or the string `all` to request access to all workspaces in the org,
     * to request grant access to in AAA scenarios
     */
    orgWorkspaceGrantFlag?: string;
    /** Whether to operate against --slackdev or production */
    qa?: boolean; // TODO: this option is provided inconsistently across commands (breaking change)
  }): Promise<ShellProcess> {
    const cmd = new SlackCLIProcess('run', { team: teamFlag, qa }, {
      '--cleanup': cleanup,
      '--hide-triggers': hideTriggers,
      '--org-workspace-grant': orgWorkspaceGrantFlag,
    });
    try {
      const proc = await cmd.execAsyncUntilOutputPresent('Connected, awaiting events', {
        cwd: appPath,
      });
      return proc;
    } catch (error) {
      throw commandError(error, 'runStart');
    }
  },

  /**
   * stop `slack run`
   * @param shell object with process to kill
   * @param teamName to check that app was deleted from that team
   */
  runStop: async function runStop(proc: ShellProcess, teamName?: string): Promise<void> {
    // TODO: teamName param should be changed to something else. 'wait for shutdown' or some such (breaking change)
    return new Promise((resolve, reject) => {
      // kill the shell process
      shell.kill(proc).then(() => {
        if (teamName) {
          // TODO: this is messed up. does not match to parameter name at all - team name has nothing to do with this.
          // Check if local app was deleted automatically, if --cleanup was passed to `runStart`
          // Wait for the output to verify process stopped
          shell.waitForOutput(SlackTracerId.SLACK_TRACE_PLATFORM_RUN_STOP, proc).then(resolve, reject);
        } else {
          resolve();
        }
      }, (err) => {
        const msg = `runStop command failed to kill process: ${err}`;
        logger.warn(msg);
        reject(new Error(msg));
      });
    });
  },
};
