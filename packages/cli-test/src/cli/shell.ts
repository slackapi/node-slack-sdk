import child from 'child_process';

import treekill from 'tree-kill';

import { timeouts } from '../utils/constants';
import logger from '../utils/logger';

import type { ShellProcess } from '../utils/types';

export const shell = {
  /**
   * Spawns a shell command
   * - Start child process with the command
   * - Listen to data output events and collect them
   * @param command The command to run, e.g. `echo "hi"`
   * @param shellOpts Options to customize shell execution
   * @returns command output
   */
  spawnProcess: function spawnProcess(
    command: string,
    shellOpts?: Partial<child.SpawnOptionsWithoutStdio>,
  ): ShellProcess {
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
      throw new Error(`spawnProcess failed!\nCommand: ${command}\nError: ${error}`);
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
      throw new Error(`runCommandSync failed!\nCommand: ${command}\nError: ${error}`);
    }
  },

  /**
   * Logic to wait for child process to finish executing
   * - Check if the close event was emitted, else wait for 1 sec
   * - Error out if > 30 sec
   * @param shell shell object
   */
  checkIfFinished: async function checkIfFinished(proc: ShellProcess): Promise<void> {
    return new Promise((resolve, reject) => {
      let timeout: NodeJS.Timeout;

      const killIt = (reason: string) => {
        shell.kill(proc).then(() => {
          reject(new Error(`${reason}\nCommand: ${proc.command}, output: ${proc.output}`));
        }, (err) => {
          reject(new Error(`${reason}\nCommand: ${proc.command}, output: ${proc.output}\nAlso errored killing process: ${err.message}`));
        });
      };

      const closeHandler = (code: number | null, signal: NodeJS.Signals | null) => {
        clearTimeout(timeout);
        logger.debug(`CLI Command "${proc.command}" closed with code ${code}, signal ${signal}`);
        resolve();
      };

      const errorHandler = (err: Error) => {
        clearTimeout(timeout);
        proc.process.off('close', closeHandler);
        logger.error(`CLI Command "${proc.command}" errored with ${err}`);
        killIt(`Command raised an error: ${err.message}`);
      };

      // Timeout the process if necessary
      timeout = setTimeout(() => {
        // Remove process event listeners
        proc.process.off('close', closeHandler);
        proc.process.off('error', errorHandler);
        killIt(`shell.checkIfFinished timed out after ${timeouts.waitingGlobal} ms.`);
      }, timeouts.waitingGlobal);

      proc.process.on('close', closeHandler);
      proc.process.on('error', errorHandler);
    });
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
  ): Promise<void> {
    const delay = 1000;
    let waitedFor = 0;
    let timedOut = false;
    while (!proc.output.includes(expString)) {
      // eslint-disable-next-line no-await-in-loop
      await this.sleep(delay);
      waitedFor += delay;
      if (waitedFor > timeouts.waitingAction) {
        timedOut = true;
        break;
      }
    }
    return new Promise((resolve, reject) => {
      if (timedOut) {
        // Kill the process
        const reason = `shell.waitForOutput timed out after ${waitedFor} ms. \nExpected output to include: ${expString}\nActual: ${proc.output}`;
        shell.kill(proc).then(() => {
          reject(new Error(`${reason}\nCommand: ${proc.command}, output: ${proc.output}`));
        }, (err) => {
          reject(new Error(`${reason}\nCommand: ${proc.command}, output: ${proc.output}\nAlso errored killing process: ${err.message}`));
        });
      } else {
        resolve();
      }
    });
  },
  assembleShellEnv: function assembleShellEnv(): Record<string, string | undefined> {
    const spawnedEnv = { ...process.env };
    if (process.platform === "win32"){
      spawnedEnv.PATH = process.env.PATH;
    }
    // Always enable test trace output
    spawnedEnv.SLACK_TEST_TRACE = 'true';
    // Skip prompts for AAA request and directly send a request
    spawnedEnv.SLACK_AUTO_REQUEST_AAA = 'true';
    // Never post to metrics store
    spawnedEnv.SLACK_DISABLE_TELEMETRY = 'true';
    return spawnedEnv;
  },
  kill: async function kill(proc: ShellProcess): Promise<boolean> {
    return new Promise((resolve, reject) => {
      treekill(proc.process.pid!, (err) => {
        if (err) {
          reject(new Error(`Failed to kill command "${proc.command}": errored with ${err.message}\nOutput: ${proc.output}`));
        } else {
          resolve(true);
        }
      });
    });
  },
};
