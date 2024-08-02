import { ProjectCommandArguments } from '../../types/commands/common_arguments';
import { SlackTracerId } from '../../utils/constants';
import logger from '../../utils/logger';
import { SlackCLICommandOptions, SlackCLIProcess } from '../cli-process';
import { shell } from '../shell';

import type { ShellProcess } from '../../types/shell';

export interface StringWaitArgument {
  /** @description string to wait for in the command output before this function returns. */
  stringToWaitFor: string;
}

export interface ProcessArgument {
  /** @description CLI process previous created via a `*Start` command. */
  proc: ShellProcess;
}

export interface RunDeployArguments {
  /** @description Hides output and prompts related to triggers. Defaults to `true`. */
  hideTriggers?: boolean;
  /**
   * @description Org workspace ID, or the string `all` to request access to all workspaces in the org,
   * to request grant access to in AAA scenarios
   */
  orgWorkspaceGrantFlag?: string;
  /** @description Delete the app after `run` process finishes. Defaults to `true`. */
  cleanup?: boolean;
}

/**
 * `slack platform activity`
 * @returns command output
 */
export const activity = async function activity(args: ProjectCommandArguments & {
  /** @description Source of logs to filter; can be `slack` or `developer`. */
  source?: 'slack' | 'developer';
}): Promise<string> {
  const cmdOpts: SlackCLICommandOptions = {};
  if ('source' in args) {
    cmdOpts['--source'] = args.source;
  }
  const cmd = new SlackCLIProcess('activity', args, cmdOpts);
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * `slack platform activity` but waits for a specified sequence then returns the shell
 * At the specific point where the sequence is found to continue with test
 * @returns command output
 */
export const activityTailStart = async function activityTailStart(
  args: ProjectCommandArguments & StringWaitArgument,
): Promise<ShellProcess> {
  const cmd = new SlackCLIProcess('activity', args, { '--tail': true });
  const proc = await cmd.execAsyncUntilOutputPresent(args.stringToWaitFor, {
    cwd: args.appPath,
  });
  return proc;
};

/**
 * Waits for a specified string in the provided `activityTailStart` process output,
 * kills the process then returns the output
 * @returns command output
 */
export const activityTailStop = async function activityTailStop(
  args: StringWaitArgument & ProcessArgument,
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Wait for output
    shell.waitForOutput(args.stringToWaitFor, args.proc).then(() => {
      // kill the shell process
      shell.kill(args.proc).then(() => {
        resolve(args.proc.output);
      }, (err) => {
        const msg = `activityTailStop command failed to kill process: ${err}`;
        logger.warn(msg);
        reject(new Error(msg));
      });
    }, reject);
  });
};

/**
 * `slack deploy`
 * @returns command output
 */
export const deploy = async function deploy(args: ProjectCommandArguments & Omit<RunDeployArguments, 'cleanup'>): Promise<string> {
  const cmd = new SlackCLIProcess('deploy', args, {
    '--hide-triggers': typeof args.hideTriggers !== 'undefined' ? args.hideTriggers : true,
    '--org-workspace-grant': args.orgWorkspaceGrantFlag,
  });
  const proc = await cmd.execAsync({
    cwd: args.appPath,
  });
  return proc.output;
};

/**
 * start `slack run`. `runStop` must be used to stop the `run` process returned by this method.
 * @returns shell object to kill it explicitly in the test case via `runStop`
 */
export const runStart = async function runStart(
  args: ProjectCommandArguments & RunDeployArguments,
): Promise<ShellProcess> {
  const cmd = new SlackCLIProcess('run', args, {
    '--cleanup': typeof args.cleanup !== 'undefined' ? args.cleanup : true,
    '--hide-triggers': typeof args.hideTriggers !== 'undefined' ? args.hideTriggers : true,
    '--org-workspace-grant': args.orgWorkspaceGrantFlag,
  });
  const proc = await cmd.execAsyncUntilOutputPresent('Connected, awaiting events', {
    cwd: args.appPath,
  });
  return proc;
};

/**
 * stop `slack run`
 * @param teamName to check that app was deleted from that team
 */
export const runStop = async function runStop(args: ProcessArgument & {
  /** @description Should wait for the `run` process to spin down before exiting this function. */
  waitForShutdown?: boolean;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    // kill the shell process
    shell.kill(args.proc).then(() => {
      // Due to the complexity of gracefully shutting down processes on Windows / lack of interrupt signal support,
      // we don't wait for the SLACK_TRACE_PLATFORM_RUN_STOP trace on Windows
      if (process.platform === 'win32') {
        resolve();
      }

      if (args.waitForShutdown) {
        // Wait for the output to verify process stopped
        shell.waitForOutput(SlackTracerId.SLACK_TRACE_PLATFORM_RUN_STOP, args.proc).then(resolve, reject);
      } else {
        resolve();
      }
    }, (err) => {
      const msg = `runStop command failed to kill process: ${err}`;
      logger.warn(msg);
      reject(new Error(msg));
    });
  });
};

export default {
  activity,
  activityTailStart,
  activityTailStop,
  deploy,
  runStart,
  runStop,
};
