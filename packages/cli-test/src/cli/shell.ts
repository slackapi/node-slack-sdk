import * as child from 'child_process';
import kill from 'tree-kill';
import logger from '../utils/logger';
import { timeouts } from '../utils/constants';
import type { ShellProcess } from '../utils/types';

export const shell = {
  /**
   * Run shell command
   * - Start child process with the command
   * - Listen to data output events and collect them
   * @param command The command to run, e.g. `echo "hi"`
   * @returns command output
   */
  runCommandAsync: async function runAsyncCommand(command: string, skipUpdate = true): Promise<ShellProcess> {
    try {
      // TODO: if these methods are for interacting with generic shell processes,
      // then we should not encode CLI specifics like CLI env vars and flags.
      // can move that to a separate class to clean up the abstraction boundaries
      if (skipUpdate) {
        // eslint-disable-next-line no-param-reassign
        command += ' --skip-update';
      }

      const spawnedEnv = { ...process.env };
      // Always enable test trace output
      spawnedEnv.SLACK_TEST_TRACE = 'true';
      // When this flag is set, the CLI will
      // Skip prompts for AAA request and directly
      // Send a request
      spawnedEnv.SLACK_AUTO_REQUEST_AAA = 'true';
      // Never post to metrics store
      spawnedEnv.SLACK_DISABLE_TELEMETRY = 'true';

      // Start child process
      const childProcess = child.spawn(`${command}`, {
        shell: true,
        env: spawnedEnv,
      });

      // Set shell object
      const sh: ShellProcess = {
        process: childProcess,
        output: '',
        finished: false,
        command,
      };

      // Log command
      logger.info(`CLI Command started: ${sh.command}`);

      // If is deploy command

      // Listen to data event that returns all the output and collect it
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      childProcess.stdout.on('data', (data: any) => {
        sh.output += this.removeANSIcolors(data.toString());
        logger.verbose(`Output: ${this.removeANSIcolors(data.toString())}`);
      });

      // Collect error output
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      childProcess.stderr.on('data', (data: any) => {
        sh.output += this.removeANSIcolors(data.toString());
        logger.error(`Error: ${this.removeANSIcolors(data.toString())}`);
      });

      // Set the finished flag to true on close event
      childProcess.on('close', () => {
        sh.finished = true;
        logger.info(`CLI Command finished: ${sh.command}`);
      });

      return sh;
    } catch (error) {
      throw new Error(`runCommand\nFailed to run command.\nCommand: ${command}`);
    }
  },

  /**
   * Run shell command synchronously
   * - Execute child process with the command
   * - Wait for the command to complete and return the output
   * @param command cli command, e.g. <cli> --version or any shell command
   * @param skipUpdate skip auto update notification
   * @returns command output
   */
  runCommandSync: function runSyncCommand(command: string, skipUpdate = true): string {
    try {
      if (skipUpdate) {
        // eslint-disable-next-line no-param-reassign
        command += ' --skip-update';
      }

      const spawnedEnv = { ...process.env };
      // Always enable test trace output
      spawnedEnv.SLACK_TEST_TRACE = 'true';
      // When this flag is set, the CLI will
      // Skip prompts for AAA request and directly
      // Send a request
      spawnedEnv.SLACK_AUTO_REQUEST_AAA = 'true';
      // Never post to metrics store
      spawnedEnv.SLACK_DISABLE_TELEMETRY = 'true';

      // Log command
      logger.info(`CLI Command started: ${command}`);

      // Start child process
      const result = child.spawnSync(`${command}`, {
        shell: true,
        env: spawnedEnv,
      });

      // Log command
      logger.info(`CLI Command finished: ${command}`);

      return this.removeANSIcolors(result.stdout.toString());
    } catch (error) {
      throw new Error(`runCommand\nFailed to run command.\nCommand: ${command}`);
    }
  },

  /**
   * Logic to wait for child process to finish executing
   * - Check if the close event was emitted, else wait for 1 sec
   * - Error out if > 30 sec
   * @param shell shell object
   */
  checkIfFinished: async function checkIfFinished(proc: ShellProcess): Promise<void | Error> {
    const timeout = 1000;
    let waitedFor = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      await this.sleep(timeout);
      if (proc.finished) {
        break;
      }
      waitedFor += timeout;
      if (waitedFor > timeouts.waitingGlobal) {
        // Kill the process
        kill(proc.process.pid!);
        throw new Error(
          `checkIfFinished\nFailed to finish after ${timeouts.waitingGlobal} ms.\nCommand: ${proc.command}\nCurrent output: \n${proc.output}`,
        );
      }
    }
  },

  /**
   * Sleep function used to wait for cli to finish executing
   */
  sleep: function sleep(timeout = 1000): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  },

  /**
   * Remove all the ANSI color and style encoding
   * @param text string
   */
  removeANSIcolors: function removeANSIcolors(text: string): string {
    const cleanText = text.replace(
      // eslint-disable-next-line no-control-regex
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      '',
    );
    return cleanText;
  },

  /**
   * Wait for output
   * @param expString expected string
   * @param shell
   */
  waitForOutput: async function waitForOutput(
    expString: string,
    proc: ShellProcess,
  ): Promise<void | Error> {
    const timeout = 1000;
    let waitedFor = 0;

    // TODO: test for the condition in the `while` clause
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      await this.sleep(timeout);
      if (proc.output.includes(expString)) {
        break;
      }
      waitedFor += timeout;
      if (waitedFor > timeouts.waitingAction) {
        // Kill the process
        kill(proc.process.pid!);
        throw new Error(
          `waitForOutput\nCouldn't wait for output. ${timeout} milliseconds passed. \nExpected: ${expString}\nActual: ${proc.output}`,
        );
      }
    }
  },
};
