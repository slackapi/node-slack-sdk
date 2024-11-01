import child from 'node:child_process';

import treekill from 'tree-kill';

import { timeouts } from '../utils/constants';
import logger from '../utils/logger';

import type { ShellProcess } from '../types/shell';

export const shell = {
  /**
   * Spawns a shell command
   * - Start child process with the command
   * - Listen to data output events and collect them
   * @param command The command to run, e.g. echo, cat, slack.exe
   * @param args The arguments for the command, e.g. 'hi', '--skip-update'
   * @param shellOpts Options to customize shell execution
   * @returns command output
   */
  spawnProcess: function spawnProcess(
    command: string,
    args: string[],
    shellOpts?: Partial<child.SpawnOptionsWithoutStdio>,
  ): ShellProcess {
    try {
      const childProcess = child.spawn(...getSpawnArguments(command, args, shell.assembleShellEnv(), shellOpts));

      // Set shell object
      const sh: ShellProcess = {
        process: childProcess,
        output: '',
        finished: false,
        command: `${command} ${args}`,
      };

      // Log command
      logger.info(`CLI Command started: ${sh.command}`);

      // If is deploy command

      // Listen to data event that returns all the output and collect it
      // biome-ignore lint/suspicious/noExplicitAny: stdout can accept a variety of data
      childProcess.stdout.on('data', (data: any) => {
        sh.output += this.removeANSIcolors(data.toString());
        logger.verbose(`Output: ${this.removeANSIcolors(data.toString())}`);
      });

      // Collect error output
      // biome-ignore lint/suspicious/noExplicitAny: stderr can accept a variety of data
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
   * @param command The command to run, e.g. echo, cat, slack.exe
   * @param args The arguments for the command, e.g. 'hi', '--skip-update'
   * @param shellOpts various shell spawning options available to customize
   * @returns command stdout
   */
  runCommandSync: function runSyncCommand(
    command: string,
    args: string[],
    shellOpts?: Partial<child.SpawnOptionsWithoutStdio>,
  ): string {
    try {
      // Log command
      logger.info(`CLI Command started: ${command} ${args}`);

      // Start child process
      const result = child.spawnSync(...getSpawnArguments(command, args, shell.assembleShellEnv(), shellOpts));

      // Log command
      logger.info(`CLI Command finished: ${command}`);

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
      // biome-ignore lint/style/useConst: closing over timeout variable
      let timeout: NodeJS.Timeout;

      const killIt = (reason: string) => {
        shell.kill(proc).then(
          () => {
            reject(new Error(`${reason}\nCommand: ${proc.command}, output: ${proc.output}`));
          },
          (err) => {
            reject(
              new Error(
                `${reason}\nCommand: ${proc.command}, output: ${proc.output}\nAlso errored killing process: ${err.message}`,
              ),
            );
          },
        );
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
      // biome-ignore lint/suspicious/noControlCharactersInRegex: regex is magic
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
    opts?: {
      /** @description How long to wait for expected output in milliseconds. Defaults to 10 seconds. */
      timeout?: number;
    },
  ): Promise<void> {
    const delay = 1000;
    const timeout = opts?.timeout || timeouts.waitingAction;
    let waitedFor = 0;
    let timedOut = false;
    while (!proc.output.includes(expString)) {
      await this.sleep(delay);
      waitedFor += delay;
      if (waitedFor > timeout) {
        timedOut = true;
        break;
      }
    }
    return new Promise((resolve, reject) => {
      if (timedOut) {
        // Kill the process
        const reason = `shell.waitForOutput timed out after ${waitedFor} ms. \nExpected output to include: ${expString}\nActual: ${proc.output}`;
        shell.kill(proc).then(
          () => {
            reject(new Error(`${reason}\nCommand: ${proc.command}, output: ${proc.output}`));
          },
          (err) => {
            reject(
              new Error(
                `${reason}\nCommand: ${proc.command}, output: ${proc.output}\nAlso errored killing process: ${err.message}`,
              ),
            );
          },
        );
      } else {
        resolve();
      }
    });
  },
  assembleShellEnv: function assembleShellEnv(): Record<string, string | undefined> {
    const spawnedEnv = { ...process.env };
    if (process.platform === 'win32') {
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
      if (proc.process.pid) {
        treekill(proc.process.pid, (err) => {
          if (err) {
            reject(
              new Error(
                `Failed to kill command "${proc.command}": errored with ${err.message}\nOutput: ${proc.output}`,
              ),
            );
          } else {
            resolve(true);
          }
        });
      } else {
        resolve(true);
      }
    });
  },
};

/**
 * @description Returns arguments used to pass into child_process.spawn or spawnSync. Handles Windows-specifics hacks.
 */
function getSpawnArguments(
  command: string,
  args: string[],
  env: ReturnType<typeof shell.assembleShellEnv>,
  shellOpts?: Partial<child.SpawnOptionsWithoutStdio>,
): [string, string[], child.SpawnOptionsWithoutStdio] {
  if (process.platform === 'win32') {
    // In windows, we actually spawn a command prompt and tell it to invoke the CLI command.
    // The combination of windows and node's child_process spawning is complicated: on windows, child_process strips quotes from arguments. This makes passing JSON difficult.
    // As a workaround, by telling Windows Command Prompt (cmd.exe) to execute a command to completion (/c) and leave spaces intact (/c), combined with feeding arguments as an argument array into child_process, we can get around this mess.
    const windowsArgs = ['/s', '/c'].concat([command]).concat(args);
    return [
      'cmd',
      windowsArgs,
      {
        shell: true,
        env,
        ...shellOpts,
      },
    ];
  }
  return [
    command,
    args,
    {
      shell: true,
      env,
      ...shellOpts,
    },
  ];
}
