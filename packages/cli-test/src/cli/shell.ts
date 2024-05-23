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
  runCommandAsync: async function runAsyncCommand(
    command: string,
    shellOpts?: Partial<child.SpawnOptionsWithoutStdio>,
  ): Promise<ShellProcess> {
    try {
      // Start child process
      const childProcess = child.spawn(`${command}`, {
        shell: true,
        env: shell.assembleShellEnv(),
        ...shellOpts,
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
   * - Wait for the command to complete and return the standard output
   * @param command cli command, e.g. <cli> --version or any shell command
   * @param shellOpts various shell spawning options available to customize
   * @returns command stdout
   */
  runCommandSync: function runSyncCommand(
    command: string,
    shellOpts?: Partial<child.SpawnOptionsWithoutStdio>,
  ): string {
    try {
      // Log command
      logger.info(`CLI Command started: ${command}`);

      // Start child process
      const result = child.spawnSync(`${command}`, {
        shell: true,
        env: shell.assembleShellEnv(),
        ...shellOpts,
      });

      // Log command
      logger.info(`CLI Command finished: ${command}`);

      // TODO: this method only returns stdout and not stderr...
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
    const delay = 1000;
    let waitedFor = 0;

    while (!proc.output.includes(expString)) {
      // eslint-disable-next-line no-await-in-loop
      await this.sleep(delay);
      waitedFor += delay;
      if (waitedFor > timeouts.waitingAction) {
        // Kill the process
        kill(proc.process.pid!);
        throw new Error(
          `waitForOutput\nCouldn't wait for output. ${waitedFor} milliseconds passed. \nExpected: ${expString}\nActual: ${proc.output}`,
        );
      }
    }
  },
  assembleShellEnv: function assembleShellEnv(): Record<string, string | undefined> {
    const spawnedEnv = { ...process.env };
    // Always enable test trace output
    spawnedEnv.SLACK_TEST_TRACE = 'true';
    // When this flag is set, the CLI will
    // Skip prompts for AAA request and directly
    // Send a request
    spawnedEnv.SLACK_AUTO_REQUEST_AAA = 'true';
    // Never post to metrics store
    spawnedEnv.SLACK_DISABLE_TELEMETRY = 'true';
    return spawnedEnv;
  },
};
