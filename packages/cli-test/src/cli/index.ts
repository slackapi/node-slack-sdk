import kill from 'tree-kill';
import { SlackTracerId } from '../utils/constants';
import logger from '../utils/logger';
import type { ShellProcess } from '../utils/types';
import { shell } from './shell';
import commandError from './command-error';
import authCommands from './commands/auth';
import collaboratorCommands from './commands/collaborator';
import envCommands from './commands/env';
import functionCommands from './commands/function';
import platformCommands from './commands/platform';
import triggerCommands from './commands/trigger';

// TODO: many of the functions exported have the same structure:
// run command async, wait for process to stop, return output. could probably dry it up.

/**
 * Set of functions to spawn and interact with Slack Platform CLI processes and commands
 */
export const SlackCLI = {
  ...authCommands,
  auth: authCommands,
  ...collaboratorCommands, // TODO: (breaking change) remove, mimic same 'namespacing' as the actual CLI
  collaborators: {
    add: collaboratorCommands.collaboratorsAdd,
    list: collaboratorCommands.collaboratorsList,
    remove: collaboratorCommands.collaboratorsRemove,
  },
  ...envCommands, // TODO: (breaking change) remove, mimic same 'namespacing' as the actual CLI
  env: {
    add: envCommands.envAdd,
    list: envCommands.envList,
    remove: envCommands.envRemove,
  },
  ...functionCommands,
  function: {
    access: functionCommands.functionAccess,
  },
  ...platformCommands,
  platform: platformCommands,
  ...triggerCommands, // TODO: (breaking change) remove, mimic same 'namespacing' as the actual CLI
  trigger: {
    access: triggerCommands.triggerAccess,
    create: triggerCommands.triggerCreate,
    delete: triggerCommands.triggerDelete,
    info: triggerCommands.triggerInfo,
    list: triggerCommands.triggerList,
    update: triggerCommands.triggerUpdate,
  },

  /**
   * workspace delete command
   * @param appPath path to app
   * @param teamFlag team domain where app was installed
   * @returns command output
   */
  workspaceDelete: async function workspaceDelete(appPath: string, teamFlag: string): Promise<string> {
    try {
      // Start child process and run command
      // TODO: instead of `cd` into app path, should move SlackCLI to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} workspace delete --force --team ${teamFlag}`,
      );

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw SlackCLI.commandError(error, 'workspaceDelete');
    }
  },

  /**
   * Creates an app from a specified template string.
   * @param templateString template string (ex: `slack-samples/deno-hello-world`)
   * @param appName desired app name
   * @param branchName the branch to clone (default: `main`)
   * @returns command output
   */
  createAppFromTemplate: async function createAppFromTemplate({
    templateString,
    appName = '',
    branchName = 'main',
  }: {
    templateString: string;
    appName?: string;
    branchName?: string;
  }): Promise<string> {
    try {
      // TODO: instead of `cd` into app path, should move SlackCLI to setting `cwd` on the child process
      return shell.runCommandSync(
        `cd cli-apps && ${process.env.SLACK_CLI_PATH} create ${appName} --template ${templateString} --branch ${branchName}`,
      );
    } catch (error) {
      throw SlackCLI.commandError(error, 'create');
    }
  },

  /**
   * workspace install command
   * @param appPath path to app
   * @param teamFlag team domain where the app will be installed
   * @returns command output
   */
  workspaceInstall: async function workspaceInstall(appPath: string, teamFlag: string): Promise<string> {
    try {
      // Start child process and run command
      // TODO: instead of `cd` into app path, should move SlackCLI to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} workspace install --team ${teamFlag}`,
      );

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw SlackCLI.commandError(error, 'workspaceInstall');
    }
  },

  /**
   * logout command
   * @param teamFlag team domain to logout of
   * @param allWorkspaces perform the logout for all authentications
   * @returns command output
   */
  logout: async function logout(options?: { teamFlag?: string; allWorkspaces?: boolean }): Promise<string> {
    try {
      // Create the command with workspaces to logout of
      let flag = '';
      if (options?.teamFlag) {
        flag = `--team ${options.teamFlag}`;
      } else if (options?.allWorkspaces) {
        flag = '--all';
      }
      const logoutCommand = `${process.env.SLACK_CLI_PATH} logout ${flag}`;

      // Start child process and run command
      const proc = await shell.runCommandAsync(logoutCommand);

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw SlackCLI.commandError(error, 'logout');
    }
  },

  /**
   * delete command
   * @param appPath path to app
   * @param teamFlag team domain where the app will be deleted
   * @returns command output
   */
  delete: async function deleteApp(
    appPath: string,
    teamFlag: string,
    options?: { isLocalApp?: boolean },
  ): Promise<string> {
    try {
      const appEnvironment = options?.isLocalApp ? 'local' : 'deployed';

      // Start child process and run command
      // TODO: instead of `cd` into app path, should move SlackCLI to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} delete --force --team ${teamFlag} --app ${appEnvironment}`,
      );

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw SlackCLI.commandError(error, 'delete');
    }
  },

  /**
   * run command (start)
   * - runStop must be used to stop `run` process
   * @param appPath path to app
   * @param teamFlag team domain where the app is run
   * @param cleanup delete app after stopping run
   * @param hideTriggers hides output and prompts related to triggers via flag
   * @returns shell object to kill it explicitly in the test case
   */
  runStart: async function runStart({
    appPath,
    teamFlag,
    cleanup = true,
    hideTriggers = true,
    orgWorkspaceGrantFlag,
  }: {
    appPath: string;
    teamFlag: string;
    cleanup?: boolean;
    orgWorkspaceGrantFlag?: string;
    /**
     * The run command will prompt the user to create a trigger if at least one
     * trigger definition file is found in the app.
     * If SlackCLI value is true, trigger outputs and prompts will be hidden
     */
    hideTriggers?: boolean;
    /**
     * If the app has not yet been installed, set to `true`.
     * Otherwise, defaults to false.
     */
    installApp?: boolean;
  }): Promise<ShellProcess> {
    try {
      // TODO: instead of `cd` into app path, should move SlackCLI to setting `cwd` on the child process
      let command = `cd ${appPath} && ${process.env.SLACK_CLI_PATH} run --team ${teamFlag}`;
      if (cleanup) {
        command += ' --cleanup';
      }
      if (hideTriggers) {
        command += ' --hide-triggers';
      }
      if (orgWorkspaceGrantFlag) {
        command += ` --org-workspace-grant ${orgWorkspaceGrantFlag}`;
      }

      // Start child process and run command
      const proc = await shell.runCommandAsync(command);

      // Wait for run to initiate
      await shell.waitForOutput('Connected, awaiting events', proc);

      return proc;
    } catch (error) {
      throw SlackCLI.commandError(error, 'run');
    }
  },

  /**
   * run command (stop)
   * @param shell object with process to kill
   * @param teamName to check that app was deleted from that team
   */
  runStop: async function runStop(proc: ShellProcess, teamName?: string): Promise<void> {
    try {
      // Kill the process
      kill(proc.process.pid!);

      // Check if local app was deleted automatically, if --cleanup was passed to `runStart`
      if (teamName) {
        // Wait for the output to verify process stopped
        await shell.waitForOutput(SlackTracerId.SLACK_TRACE_PLATFORM_RUN_STOP, proc);
      }
    } catch (error) {
      throw SlackCLI.commandError(error, 'runStop', 'Could not kill run process');
    }
  },

  /**
   * manifest validate command
   * @param appPath path to app
   * @returns command output
   */
  manifestValidate: async function manifestValidate(appPath: string): Promise<string> {
    try {
      // Start child process and run command
      // TODO: instead of `cd` into app path, should move SlackCLI to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} manifest validate`,
      );

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw SlackCLI.commandError(error, 'manifestValidate');
    }
  },

  /**
   * external-auth
   * @param appPath path to app
   * @param teamFlag team domain of the relevant app
   * @param provider provider to add external auth for
   * @param flags specification of external-auth, e.g. add or add-secret
   * @returns command output
   */
  externalAuth: async function externalAuth(
    appPath: string,
    teamFlag: string,
    provider: string,
    flags: string,
  ): Promise<string> {
    try {
      // Configure command for different envs
      // TODO: instead of `cd` into app path, should move SlackCLI to setting `cwd` on the child process
      const command = `cd ${appPath} && ${process.env.SLACK_CLI_PATH} external-auth ${flags} --team ${teamFlag} --provider ${provider}`;

      // Start child process and run command
      const proc = await shell.runCommandAsync(command);

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw SlackCLI.commandError(error, 'externalAuth');
    }
  },

  /**
   * Delete app and Log out of all sessions
   * @param options
   */
  stopSession: async function stopSession({
    appPath,
    appTeamID,
    isLocalApp,
  }: {
    /**
     * Path to app
     */
    appPath?: string;
    /**
     * Team domain
     */
    appTeamID: string;
    isLocalApp?: boolean;
  }): Promise<void> {
    if (appPath) {
      // List instances of app installation if app path provided
      // TODO: instead of `cd` into app path, should move SlackCLI to setting `cwd` on the child process
      const installedAppsOutput = await SlackCLI.runSimpleCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} workspace list`,
      );
      // If app is installed
      if (!installedAppsOutput.includes('This project has no apps')) {
        // Soft app delete
        try {
          await SlackCLI.delete(appPath, appTeamID, { isLocalApp });
        } catch (error) {
          logger.info(`Could not delete gracefully. Error: ${error}`);
        }

        // Delete app.json file. Needed for retries. Otherwise asks for collaborator, if old file is present
        try {
          await SlackCLI.runSimpleCommand(`rm -rf ${appPath}/.slack`, {
            skipUpdate: false,
          });
        } catch (error) {
          logger.info(`Could not hard delete ${appPath}/.slack. Error: ${error}`);
        }
      }
    }

    // Log out if logged in
    try {
      await SlackCLI.logout({ allWorkspaces: true });
    } catch (error) {
      // TODO: maybe SlackCLI should error instead?
      logger.info(`Could not logout gracefully. Error: ${error}`);
    }
  },

  /**
   * Run simple CLI command that do not require any interaction
   * @param command The command to execute when spawning a new process
   * @param options TODO: document options, split out into a shareable options type (review options for all methods)
   */
  runSimpleCommand: async function runSimpleCommand(
    command: string,
    options?: {
      /**
       * Skip auto update notification?
       */
      skipUpdate: boolean;
    },
  ): Promise<string> {
    try {
      // Start child process and run command
      const proc = await shell.runCommandAsync(command, options?.skipUpdate);

      // Wait for shell.finished state
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw SlackCLI.commandError(error, 'runSimpleCommand');
    }
  },
  commandError,
};
