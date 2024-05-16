import kill from 'tree-kill';
import { CustomError } from '../utils/custom-errors';
import { SlackTracerId } from '../utils/constants';
import logger from '../utils/logger';
import type { ShellProcess } from '../utils/types';
import { shell } from './shell';

// TODO: many of the functions exported have the same structure:
// run command async, wait for process to stop, return output. could probably dry it up.

/**
 * Set of functions to spawn and interact with Slack Platform CLI processes and commands
 */
export const SlackCLI = {
  /**
   *  `slack login --no-prompt`
   */
  loginNoPrompt: async function loginNoPrompt(options?: { qa?: boolean }): Promise<{
    /**
     * Command output
     */
    shellOutput: ShellProcess['output'];
    /**
     * Slash command with auth ticket, e.g. '/slackauthticket MTMxNjgxMDUtYTYwOC00NzRhLWE3M2YtMjVmZTQyMjc1MDg4'
     */
    authTicketSlashCommand: string;
    /**
     * An auth ticket is a A UUID sequence granted by Slack to a CLI auth requestor.
     * That ticket must then be submitted via slash command by a user logged in to Slack and permissions accepted to be
     * granted a token for use.
     */
    authTicket: string;
  }> {
    // add no-prompt login flag
    let command = `${process.env.SLACK_CLI_PATH} login --no-prompt`;
    // TODO: dev login option should be encoded in a CLI shell command wrapper
    // Dev login
    if (options?.qa) {
      command = `${command} --slackdev`;
    }
    try {
      const proc = await shell.runCommandAsync(command);

      // Get auth token
      await shell.waitForOutput('/slackauthticket', proc);
      const authTicketSlashCommand = proc.output.match('/slackauthticket(.*)')![0];
      const authTicket = authTicketSlashCommand.split(' ')[1];

      // Wait for shell.finished state
      await shell.checkIfFinished(proc);

      return {
        shellOutput: proc.output,
        authTicketSlashCommand,
        authTicket,
      };
    } catch (error) {
      throw this.commandError(
        error,
        'loginChallenge',
        'Error running command. \nTip: You must have no active authenticated sessions in cli',
      );
    }
  },
  /**
   * login --no-prompt --challenge --ticket command
   * @param challenge challenge string from UI
   * @param authTicket authTicket string from loginNoPrompt
   * @param options
   * @returns
   */
  loginChallengeExchange: async function loginChallengeExchange(
    challenge: string,
    authTicket: string,
    options?: {
      qa?: boolean;
    },
  ): Promise<string> {
    let command = `${process.env.SLACK_CLI_PATH} login`;
    // TODO: dev login option should be encoded in a CLI shell command wrapper
    // Dev login
    if (options?.qa) {
      command = `${command} --slackdev`;
    }
    try {
      // Exchange the challenge code and ticket # for a token
      const exchangeTicketCommand = `${command} --no-prompt --challenge ${challenge} --ticket ${authTicket}`;
      const proc = await shell.runCommandAsync(exchangeTicketCommand);

      // Wait for shell.finished state
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(
        error,
        'loginChallengeExchange',
        'Error running command. \nTip: You must be authenticated in Slack client and have valid challenge and authTicket',
      );
    }
  },

  /**
   * deploy command
   * @param appPath path to app
   * @param teamFlag team domain to deploy the app to
   * @param hideTriggers hides output and prompts related to triggers via flag
   * @param orgWorkspaceGrantFlag Org workspace to request grant access to in AAA scenarios
   * @returns command output
   */
  deploy: async function deploy({
    appPath,
    teamFlag,
    hideTriggers = true,
    orgWorkspaceGrantFlag,
  }: {
    appPath: string;
    teamFlag: string;
    /**
     * The deploy command will prompt the user to create a trigger if at least one
     * trigger definition file is found in the app.
     * If this value is true, trigger outputs and prompts will be hidden
     */
    hideTriggers?: boolean;
    orgWorkspaceGrantFlag?: string;
  }): Promise<string> {
    try {
      // Configure command for different envs
      let command = `cd ${appPath} && ${process.env.SLACK_CLI_PATH} deploy --team ${teamFlag}`;
      if (hideTriggers) {
        command += ' --hide-triggers';
      }
      if (orgWorkspaceGrantFlag) {
        command += ` --org-workspace-grant ${orgWorkspaceGrantFlag}`;
      }

      return shell.runCommandSync(command);
    } catch (error) {
      throw this.commandError(error, 'deploy');
    }
  },

  /**
   * collaborators list command
   * @param appPath path to app
   * @param teamFlag team domain to list collaborators for
   * @returns command output
   */
  collaboratorsList: async function collaboratorsList(appPath: string, teamFlag: string): Promise<string> {
    try {
      // Start child process and run command
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} collaborators list --team ${teamFlag}`,
      );

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'collaboratorsList', 'Error running command');
    }
  },

  /**
   * collaborators add command
   * @param appPath path to app
   * @param teamFlag team domain to add collaborators to
   * @param collaboratorEmail email of the user to be added as a collaborator
   * @returns command output
   */
  collaboratorsAdd: async function collaboratorsAdd(
    appPath: string,
    teamFlag: string,
    collaboratorEmail: string,
  ): Promise<string> {
    try {
      // Start child process and run command
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} collaborators add ${collaboratorEmail} --team ${teamFlag}`,
      );

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'collaboratorsAdd');
    }
  },

  /**
   * collaborators remove command
   * @param appPath path to app
   * @param teamFlag team domain to remove collaborators from
   * @param collaboratorEmail email of the user to be removed as a collaborator
   * @returns command output
   */
  collaboratorsRemove: async function collaboratorsRemove(
    appPath: string,
    teamFlag: string,
    collaboratorEmail: string,
  ): Promise<string> {
    try {
      // Start child process and run command
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} collaborators remove ${collaboratorEmail} --team ${teamFlag}`,
      );

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'collaboratorsRemove');
    }
  },

  /**
   * env list command
   * @param appPath path to app
   * @param teamFlag team domain where variables were added
   * @returns command output
   */
  envList: async function envList(appPath: string, teamFlag: string): Promise<string> {
    try {
      // Start child process and run command
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} env list --team ${teamFlag}`,
      );

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'envList');
    }
  },

  /**
   * env add command
   * @param appPath path to app
   * @param teamFlag team domain to add environment variables to
   * @param secretKey environment variable key
   * @param secretValue environment variable value
   * @returns command output
   */
  envAdd: async function envAdd(
    appPath: string,
    teamFlag: string,
    secretKey: string,
    secretValue: string,
  ): Promise<string> {
    try {
      // Start child process and run command
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} env add ${secretKey} ${secretValue} --team ${teamFlag}`,
      );

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'envAdd');
    }
  },

  /**
   * env remove command
   * @param appPath path to app
   * @param teamFlag team domain to remove environment variables from
   * @param secretKey environment variable key
   * @returns command output
   */
  envRemove: async function envRemove(appPath: string, teamFlag: string, secretKey: string): Promise<string> {
    try {
      // Start child process and run command
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} env remove ${secretKey} --team ${teamFlag}`,
      );

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'envRemove');
    }
  },

  /**
   * trigger create command
   * @param appPath path to app
   * @param teamFlag team domain where the trigger will be created
   * @param flag method of trigger creation + ref, i.e. --trigger-def triggers/add-pin.json, etc
   * @param orgWorkspaceGrantFlag trigger create command will attempt to install an app. This flag
   * supplies additional workspace within an org to grant app access to as part of install
   * @returns command output
   */
  // TODO: this does not need to be async; why was it implemented using sync shell command?
  triggerCreate: async function triggerCreate({
    appPath,
    teamFlag,
    flag,
    orgWorkspaceGrantFlag,
    options,
  }: {
    appPath: string;
    teamFlag: string;
    flag: string;
    orgWorkspaceGrantFlag?: string;
    options?: {
      /**
       * Local app for local run sessions
       */
      localApp?: boolean;
      /**
       * Install app by selecting "Install to a new team"
       */
      installApp?: boolean;
    };
  }): Promise<string> {
    try {
      const appEnvironment = options?.localApp ? 'local' : 'deployed';

      // Start child process and run command
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      let command = `cd ${appPath} && ${process.env.SLACK_CLI_PATH} trigger create ${flag} --team ${teamFlag} --app ${appEnvironment}`;

      if (orgWorkspaceGrantFlag) {
        command += ` --org-workspace-grant ${orgWorkspaceGrantFlag}`;
      }

      return shell.runCommandSync(command);
    } catch (error) {
      throw this.commandError(error, 'triggerCreate');
    }
  },

  /**
   * trigger list command
   * @param appPath path to app
   * @param teamFlag team domain for listing all triggers
   * @param flag of trigger list
   * @returns command output
   */
  triggerList: async function triggerList(appPath: string, teamFlag: string, flag: string): Promise<string> {
    try {
      // Start child process and run command
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} triggers list ${flag} --team ${teamFlag}`,
      );

      // Check if process is finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'triggerList');
    }
  },

  /**
   * trigger update command
   * @param appPath path to the app
   * @param teamFlag team domain for the updating trigger
   * @param flag specification of trigger update, e.g --trigger-id Ft0143UPTAV8
   * @returns command output
   */
  triggerUpdate: async function triggerUpdate(appPath: string, teamFlag: string, flag: string): Promise<string> {
    try {
      // Start child process and run command
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} trigger update ${flag} --team ${teamFlag}`,
      );

      // Check if process is finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'triggerUpdate');
    }
  },

  /**
   * trigger info command
   * @param appPath path to the app
   * @param teamFlag team domain of the trigger
   * @param flag
   * @returns command output
   */
  triggerInfo: async function triggerInfo(appPath: string, teamFlag: string, flag: string): Promise<string> {
    try {
      // Start child process and run command
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} trigger info ${flag} --team ${teamFlag}`,
      );

      // Check if process is finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'triggerInfo');
    }
  },

  /**
   * app activity command
   * @param appPath path to the app
   * @param teamFlag team domain for activity logs
   * @param flag
   * @returns command output
   */
  activity: async function activity({
    appPath,
    teamFlag,
    flag,
    localApp = true,
  }: {
    appPath: string;
    teamFlag: string;
    flag?: string;
    localApp?: boolean;
  }): Promise<string> {
    try {
      const appEnvironment = localApp ? 'local' : 'deployed';

      // Start child process and run command
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} activity ${flag} --team ${teamFlag} --app ${appEnvironment}`,
      );

      // Check if process is finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'activity');
    }
  },

  /**
   * activityTailStart waits for a specified sequence then returns the shell
   * At the specific point where the sequence is found to continue with test
   * @param teamFlag team domain for activity logs
   * @param appPath the path of the app
   * @param stringToWaitFor expected activity output
   * @param localApp true if the app whose activity is being tailed is locally
   * running, e.g. via run command.
   * @returns command output
   */
  activityTailStart: async function activityTailStart({
    teamFlag,
    appPath,
    stringToWaitFor,
    localApp = true,
  }: {
    teamFlag: string;
    appPath: string;
    stringToWaitFor: string;
    localApp?: boolean;
  }): Promise<ShellProcess> {
    try {
      const appEnvironment = localApp ? 'local' : 'deployed';
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const command = `cd ${appPath} && ${process.env.SLACK_CLI_PATH} activity --tail --team ${teamFlag} --app ${appEnvironment}`;

      // Start child process and run command
      const proc = await shell.runCommandAsync(command);

      // Wait for this sequence
      await shell.waitForOutput(stringToWaitFor, proc);

      // Return shell process
      return proc;
    } catch (error) {
      throw this.commandError(error, 'activityTailStart');
    }
  },

  /**
   * app activity tail stop command
   * @param shell shell process to kill
   * @param stringToWait string to wait for
   * @returns command output
   */
  activityTailStop: async function activityTailStop({
    proc,
    stringToWait,
  }: {
    proc: ShellProcess;
    stringToWait: string;
  }): Promise<string> {
    try {
      // Wait for output
      await shell.waitForOutput(stringToWait, proc);

      // kill the shell process
      kill(proc.process.pid!);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(
        error,
        'activityTailStop',
        'Failed in attempt to stop the process',
      );
    }
  },

  /**
   * trigger delete command
   * @param appPath path to the app
   * @param teamFlag team domain to delete trigger from
   * @param flag
   * @returns command output
   */
  triggerDelete: async function triggerDelete(appPath: string, teamFlag: string, flag: string): Promise<string> {
    try {
      // Start child process and run command
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} trigger delete ${flag} --team ${teamFlag}`,
      );

      // Check if process is finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'triggerDelete');
    }
  },

  /**
   * trigger access command
   * @param appPath path to app
   * @param teamFlag team domain of the updating trigger
   * @param flags specification of trigger access, e.g. --trigger-id Ft0143UPTAV8 --everyone
   * @returns command output
   */
  triggerAccess: async function triggerAccess(appPath: string, teamFlag: string, flags: string): Promise<string> {
    try {
      // Start child process and run command
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} trigger access ${flags} --team ${teamFlag}`,
      );

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'triggerAccess');
    }
  },

  /**
   * function distribute command
   * @param appPath path to app
   * @param teamFlag team domain for the function's app
   * @param flags specification of function distribution, i.e. --name greeting_function --app-collaborators
   * @returns
   */
  functionDistribute: async function functionDistribute(
    appPath: string,
    teamFlag: string,
    flags: string,
  ): Promise<string> {
    try {
      // Start child process and run command
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} function distribute ${flags} --team ${teamFlag}`,
      );

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'functionDistribute');
    }
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
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} workspace delete --force --team ${teamFlag}`,
      );

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'workspaceDelete');
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
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      return shell.runCommandSync(
        `cd cli-apps && ${process.env.SLACK_CLI_PATH} create ${appName} --template ${templateString} --branch ${branchName}`,
      );
    } catch (error) {
      throw this.commandError(error, 'create');
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
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} workspace install --team ${teamFlag}`,
      );

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'workspaceInstall');
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
      throw this.commandError(error, 'logout');
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
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} delete --force --team ${teamFlag} --app ${appEnvironment}`,
      );

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'delete');
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
     * If this value is true, trigger outputs and prompts will be hidden
     */
    hideTriggers?: boolean;
    /**
     * If the app has not yet been installed, set to `true`.
     * Otherwise, defaults to false.
     */
    installApp?: boolean;
  }): Promise<ShellProcess> {
    try {
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
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
      throw this.commandError(error, 'run');
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
      throw this.commandError(error, 'runStop', 'Could not kill run process');
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
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const proc = await shell.runCommandAsync(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} manifest validate`,
      );

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'manifestValidate');
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
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const command = `cd ${appPath} && ${process.env.SLACK_CLI_PATH} external-auth ${flags} --team ${teamFlag} --provider ${provider}`;

      // Start child process and run command
      const proc = await shell.runCommandAsync(command);

      // Check if process finished
      await shell.checkIfFinished(proc);

      // Return output
      return proc.output;
    } catch (error) {
      throw this.commandError(error, 'externalAuth');
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
      // TODO: instead of `cd` into app path, should move this to setting `cwd` on the child process
      const installedAppsOutput = await this.runSimpleCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} workspace list`,
      );
      // If app is installed
      if (!installedAppsOutput.includes('This project has no apps')) {
        // Soft app delete
        try {
          await this.delete(appPath, appTeamID, { isLocalApp });
        } catch (error) {
          logger.info(`Could not delete gracefully. Error: ${error}`);
        }

        // Delete app.json file. Needed for retries. Otherwise asks for collaborator, if old file is present
        try {
          await this.runSimpleCommand(`rm -rf ${appPath}/.slack`, {
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
      // TODO: maybe this should error instead?
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

  /**
   * Error handler for Lib
   * @param error error object to wrap
   * @param command command used
   * @param additionalInfo any extra info
   * @returns The wrapped CustomError object
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commandError: function commandError(error: any, command: string, additionalInfo?: string): CustomError {
    // Specify error name, if it's a generic Error
    if (error.name) {
      // eslint-disable-next-line no-param-reassign
      error.name = error.name.toString() === 'Error' ? 'commandError' : 'Error';
    }

    // Create new error and return it
    const newError = new CustomError(error.message, error.name, error.stack, {
      command,
      additionalInfo,
    });
    return newError;
  },
};
