import kill from 'tree-kill';
import * as child from 'child_process';
import { CustomError } from '../utils/custom-errors';
import { slackCLILibConfig } from '../utils/slack-cli-config';
import logger from '../utils/logger';
import type { ShellProcess } from '../utils/cli-lib-helper';
import { SlackTracerId } from '../utils/constants';

/**
 * login --no-prompt command results type
 */
interface LoginNoPromptResult {
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
}

/**
 * Class to spawn and interact with Slack Platform CLI processes and commands
 */
export class SlackCLI {
  /**
   * Template for new commands
   */
  public static async funcName(): Promise<string> {
    try {
      // Start child process and run command
      const shell = await this.runCommand('Provide your command here');

      // Check if process finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'Command Name', 'Additional info');
    }
  }

  /**
   * Run simple cli command that doesn't require any interaction
   * @param command cli command, e.g. <cli> --version
   * @returns command output
   */
  public static async runSimpleCommand(
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
      const shell = await this.runCommand(command, options?.skipUpdate);

      // Wait for shell.finished state
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'runSimpleCommand');
    }
  }

  /**
   * login --no-prompt command
   * @param options
   * @returns
   */
  public static async loginNoPrompt(options?: { qa?: boolean }): Promise<LoginNoPromptResult> {
    // add no-prompt login flag
    let command = `${process.env.SLACK_CLI_PATH} login --no-prompt`;
    // Dev login
    if (options?.qa) {
      command = `${command} --slackdev`;
    }
    try {
      const shell = await this.runCommand(command);

      // Get auth token
      await this.waitForOutput('/slackauthticket', shell);
      const authTicketSlashCommand = shell.output.match('/slackauthticket(.*)')![0];
      const authTicket = authTicketSlashCommand.split(' ')[1];

      // Wait for shell.finished state
      await this.checkIfFinished(shell);

      return {
        shellOutput: shell.output,
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
  }

  /**
   * login --no-prompt --challenge --ticket command
   * @param challenge challenge string from UI
   * @param authTicket authTicket string from loginNoPrompt
   * @param options
   * @returns
   */
  public static async loginChallengeExchange(
    challenge: string,
    authTicket: string,
    options?: {
      qa?: boolean;
    },
  ): Promise<string> {
    let command = `${process.env.SLACK_CLI_PATH} login`;
    // Dev login
    if (options?.qa) {
      command = `${command} --slackdev`;
    }
    try {
      // Exchange the challenge code and ticket # for a token
      const exchangeTicketCommand = `${command} --no-prompt --challenge ${challenge} --ticket ${authTicket}`;
      const shell = await this.runCommand(exchangeTicketCommand);

      // Wait for shell.finished state
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(
        error,
        'loginChallengeExchange',
        'Error running command. \nTip: You must be authenticated in Slack client and have valid challenge and authTicket',
      );
    }
  }

  /**
   * deploy command
   * @param appPath path to app
   * @param teamFlag team domain to deploy the app to
   * @param hideTriggers hides output and prompts related to triggers via flag
   * @param orgWorkspaceGrantFlag Org workspace to request grant access to in AAA scenarios
   * @returns command output
   */
  public static async deploy({
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

      // Execute process and run command
      //
      // If process finished with output AAA request submitted
      //

      return this.runCommandSync(command);
    } catch (error) {
      throw this.commandError(error, 'deploy');
    }
  }

  /**
   * collaborators list command
   * @param appPath path to app
   * @param teamFlag team domain to list collaborators for
   * @returns command output
   */
  public static async collaboratorsList(appPath: string, teamFlag: string): Promise<string> {
    try {
      // Start child process and run command
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} collaborators list --team ${teamFlag}`,
      );

      // Check if process finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'collaboratorsList', 'Error running command');
    }
  }

  /**
   * collaborators add command
   * @param appPath path to app
   * @param teamFlag team domain to add collaborators to
   * @param collaboratorEmail email of the user to be added as a collaborator
   * @returns command output
   */
  public static async collaboratorsAdd(
    appPath: string,
    teamFlag: string,
    collaboratorEmail: string,
  ): Promise<string> {
    try {
      // Start child process and run command
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} collaborators add ${collaboratorEmail} --team ${teamFlag}`,
      );

      // Check if process finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'collaboratorsAdd');
    }
  }

  /**
   * collaborators remove command
   * @param appPath path to app
   * @param teamFlag team domain to remove collaborators from
   * @param collaboratorEmail email of the user to be removed as a collaborator
   * @returns command output
   */
  public static async collaboratorsRemove(
    appPath: string,
    teamFlag: string,
    collaboratorEmail: string,
  ): Promise<string> {
    try {
      // Start child process and run command
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} collaborators remove ${collaboratorEmail} --team ${teamFlag}`,
      );

      // Check if process finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'collaboratorsRemove');
    }
  }

  /**
   * env list command
   * @param appPath path to app
   * @param teamFlag team domain where variables were added
   * @returns command output
   */
  public static async envList(appPath: string, teamFlag: string): Promise<string> {
    try {
      // Start child process and run command
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} env list --team ${teamFlag}`,
      );

      // Check if process finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'envList');
    }
  }

  /**
   * env add command
   * @param appPath path to app
   * @param teamFlag team domain to add environment variables to
   * @param secretKey environment variable key
   * @param secretValue environment variable value
   * @returns command output
   */
  public static async envAdd(
    appPath: string,
    teamFlag: string,
    secretKey: string,
    secretValue: string,
  ): Promise<string> {
    try {
      // Start child process and run command
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} env add ${secretKey} ${secretValue} --team ${teamFlag}`,
      );

      // Check if process finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'envAdd');
    }
  }

  /**
   * env remove command
   * @param appPath path to app
   * @param teamFlag team domain to remove environment variables from
   * @param secretKey environment variable key
   * @returns command output
   */
  public static async envRemove(appPath: string, teamFlag: string, secretKey: string): Promise<string> {
    try {
      // Start child process and run command
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} env remove ${secretKey} --team ${teamFlag}`,
      );

      // Check if process finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'envRemove');
    }
  }

  /**
   * trigger create command
   * @param appPath path to app
   * @param teamFlag team domain where the trigger will be created
   * @param flag method of trigger creation + ref, i.e. --trigger-def triggers/add-pin.json, etc
   * @param orgWorkspaceGrantFlag trigger create command will attempt to install an app. This flag
   * supplies additional workspace within an org to grant app access to as part of install
   * @returns command output
   */
  public static async triggerCreate({
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
      let command = `cd ${appPath} && ${process.env.SLACK_CLI_PATH} trigger create ${flag} --team ${teamFlag} --app ${appEnvironment}`;

      if (orgWorkspaceGrantFlag) {
        command += ` --org-workspace-grant ${orgWorkspaceGrantFlag}`;
      }

      return this.runCommandSync(command);
    } catch (error) {
      throw this.commandError(error, 'triggerCreate');
    }
  }

  /**
   * trigger list command
   * @param appPath path to app
   * @param teamFlag team domain for listing all triggers
   * @param flag of trigger list
   * @returns command output
   */
  public static async triggerList(appPath: string, teamFlag: string, flag: string): Promise<string> {
    try {
      // Start child process and run command
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} triggers list ${flag} --team ${teamFlag}`,
      );

      // Check if process is finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'triggerList');
    }
  }

  /**
   * trigger update command
   * @param appPath path to the app
   * @param teamFlag team domain for the updating trigger
   * @param flag specification of trigger update, e.g --trigger-id Ft0143UPTAV8
   * @returns command output
   */
  public static async triggerUpdate(appPath: string, teamFlag: string, flag: string): Promise<string> {
    try {
      // Start child process and run command
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} trigger update ${flag} --team ${teamFlag}`,
      );

      // Check if process is finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'triggerUpdate');
    }
  }

  /**
   * trigger info command
   * @param appPath path to the app
   * @param teamFlag team domain of the trigger
   * @param flag
   * @returns command output
   */
  public static async triggerInfo(appPath: string, teamFlag: string, flag: string): Promise<string> {
    try {
      // Start child process and run command
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} trigger info ${flag} --team ${teamFlag}`,
      );

      // Check if process is finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'triggerInfo');
    }
  }

  /**
   * app activity command
   * @param appPath path to the app
   * @param teamFlag team domain for activity logs
   * @param flag
   * @returns command output
   */
  public static async activity({
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
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} activity ${flag} --team ${teamFlag} --app ${appEnvironment}`,
      );

      // Check if process is finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'activity');
    }
  }

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
  public static async activityTailStart({
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
      const command = `cd ${appPath} && ${process.env.SLACK_CLI_PATH} activity --tail --team ${teamFlag} --app ${appEnvironment}`;

      // Start child process and run command
      const shell = await this.runCommand(command);

      // Wait for this sequence
      await this.waitForOutput(stringToWaitFor, shell);

      // Return shell process
      return shell;
    } catch (error) {
      throw this.commandError(error, 'activityTailStart');
    }
  }

  /**
   * app activity tail stop command
   * @param shell shell process to kill
   * @param stringToWait string to wait for
   * @returns command output
   */
  public static async activityTailStop({
    shell,
    stringToWait,
  }: {
    shell: ShellProcess;
    stringToWait: string;
  }): Promise<string> {
    try {
      // Wait for output
      await this.waitForOutput(stringToWait, shell);

      // kill the shell process
      kill(shell.process.pid!);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(
        error,
        'activityTailStop',
        'Failed in attempt to stop the process',
      );
    }
  }

  /**
   * trigger delete command
   * @param appPath path to the app
   * @param teamFlag team domain to delete trigger from
   * @param flag
   * @returns command output
   */
  public static async triggerDelete(appPath: string, teamFlag: string, flag: string): Promise<string> {
    try {
      // Start child process and run command
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} trigger delete ${flag} --team ${teamFlag}`,
      );

      // Check if process is finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'triggerDelete');
    }
  }

  /**
   * trigger access command
   * @param appPath path to app
   * @param teamFlag team domain of the updating trigger
   * @param flags specification of trigger access, e.g. --trigger-id Ft0143UPTAV8 --everyone
   * @returns command output
   */
  public static async triggerAccess(appPath: string, teamFlag: string, flags: string): Promise<string> {
    try {
      // Start child process and run command
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} trigger access ${flags} --team ${teamFlag}`,
      );

      // Check if process finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'triggerAccess');
    }
  }

  /**
   * function distribute command
   * @param appPath path to app
   * @param teamFlag team domain for the function's app
   * @param flags specification of function distribution, i.e. --name greeting_function --app-collaborators
   * @returns
   */
  public static async functionDistribute(appPath: string, teamFlag: string, flags: string): Promise<string> {
    try {
      // Start child process and run command
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} function distribute ${flags} --team ${teamFlag}`,
      );

      // Check if process finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'functionDistribute');
    }
  }

  /**
   * workspace delete command
   * @param appPath path to app
   * @param teamFlag team domain where app was installed
   * @returns command output
   */
  public static async workspaceDelete(appPath: string, teamFlag: string): Promise<string> {
    try {
      // Start child process and run command
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} workspace delete --force --team ${teamFlag}`,
      );

      // Check if process finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'workspaceDelete');
    }
  }

  /**
   * Creates an app from a specified template string.
   * @param templateString template string (ex: `slack-samples/deno-hello-world`)
   * @param appName desired app name
   * @param branchName the branch to clone (default: `main`)
   * @returns command output
   */
  public static async createAppFromTemplate({
    templateString,
    appName = '',
    branchName = 'main',
  }: {
    templateString: string;
    appName?: string;
    branchName?: string;
  }): Promise<string> {
    try {
      return this.runCommandSync(
        `cd cli-apps && ${process.env.SLACK_CLI_PATH} create ${appName} --template ${templateString} --branch ${branchName}`,
      );
    } catch (error) {
      throw this.commandError(error, 'create');
    }
  }

  /**
   * workspace install command
   * @param appPath path to app
   * @param teamFlag team domain where the app will be installed
   * @returns command output
   */
  public static async workspaceInstall(appPath: string, teamFlag: string): Promise<string> {
    try {
      // Start child process and run command
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} workspace install --team ${teamFlag}`,
      );

      // Check if process finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'workspaceInstall');
    }
  }

  /**
   * logout command
   * @param teamFlag team domain to logout of
   * @param allWorkspaces perform the logout for all authentications
   * @returns command output
   */
  public static async logout(options?: { teamFlag?: string; allWorkspaces?: boolean }): Promise<string> {
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
      const shell = await this.runCommand(logoutCommand);

      // Check if process finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'logout');
    }
  }

  /**
   * delete command
   * @param appPath path to app
   * @param teamFlag team domain where the app will be deleted
   * @returns command output
   */
  public static async delete(
    appPath: string,
    teamFlag: string,
    options?: { isLocalApp?: boolean },
  ): Promise<string> {
    try {
      const appEnvironment = options?.isLocalApp ? 'local' : 'deployed';

      // Start child process and run command
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} delete --force --team ${teamFlag} --app ${appEnvironment}`,
      );

      // Check if process finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'delete');
    }
  }

  /**
   * run command (start)
   * - runStop must be used to stop `run` process
   * @param appPath path to app
   * @param teamFlag team domain where the app is run
   * @param cleanup delete app after stopping run
   * @param hideTriggers hides output and prompts related to triggers via flag
   * @returns shell object to kill it explicitly in the test case
   */
  public static async runStart({
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
      const shell = await this.runCommand(command);

      // Wait for run to initiate
      await this.waitForOutput('Connected, awaiting events', shell);

      // Return output
      return shell;
    } catch (error) {
      throw this.commandError(error, 'run');
    }
  }

  /**
   * run command (stop)
   * @param shell object with process to kill
   * @param teamName to check that app was deleted from that team
   */
  public static async runStop(shell: ShellProcess, teamName?: string): Promise<void> {
    try {
      // Kill the process
      kill(shell.process.pid!);

      // Check if local app was deleted automatically, if --cleanup was passed to `runStart`
      if (teamName) {
        // Wait for the output to verify process stopped
        await this.waitForOutput(SlackTracerId.SLACK_TRACE_PLATFORM_RUN_STOP, shell);
      }
    } catch (error) {
      throw this.commandError(error, 'runStop', 'Could not kill run process');
    }
  }

  /**
   * manifest validate command
   * @param appPath path to app
   * @returns command output
   */
  public static async manifestValidate(appPath: string): Promise<string> {
    try {
      // Start child process and run command
      const shell = await this.runCommand(
        `cd ${appPath} && ${process.env.SLACK_CLI_PATH} manifest validate`,
      );

      // Check if process finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'manifestValidate');
    }
  }

  /**
   * external-auth
   * @param appPath path to app
   * @param teamFlag team domain of the relevant app
   * @param provider provider to add external auth for
   * @param flags specification of external-auth, e.g. add or add-secret
   * @returns command output
   */
  public static async externalAuth(
    appPath: string,
    teamFlag: string,
    provider: string,
    flags: string,
  ): Promise<string> {
    try {
      // Configure command for different envs
      const command = `cd ${appPath} && ${process.env.SLACK_CLI_PATH} external-auth ${flags} --team ${teamFlag} --provider ${provider}`;

      // Start child process and run command
      const shell = await this.runCommand(command);

      // Check if process finished
      await this.checkIfFinished(shell);

      // Return output
      return shell.output;
    } catch (error) {
      throw this.commandError(error, 'externalAuth');
    }
  }

  /**
   * Delete app and Log out of all sessions
   * @param options
   */
  public static async stopSession({
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
      logger.info(`Could not logout gracefully. Error: ${error}`);
    }
  }

  /**
   * Error handler for Lib
   * @param error default error object
   * @param command command used
   * @param additionalInfo any extra info
   *  @returns Error
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static commandError(error: any, command: string, additionalInfo?: string): Error {
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
  }

  /**
   * Run shell command
   * - Start child process with the command
   * - Listen to data output events and collect them
   * @param command cli command, e.g. <cli> --version or any shell command
   * @param skipUpdate skip auto update notification
   * @returns command output
   */
  private static async runCommand(command: string, skipUpdate = true): Promise<ShellProcess> {
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

      // Start child process
      const childProcess = child.spawn(`${command}`, {
        shell: true,
        env: spawnedEnv,
      });

      // Set shell object
      const shell: ShellProcess = {
        process: childProcess,
        output: '',
        finished: false,
        command,
      };

      // Log command
      logger.info(`CLI Command started: ${shell.command}`);

      // If is deploy command

      // Listen to data event that returns all the output and collect it
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      childProcess.stdout.on('data', (data: any) => {
        shell.output += this.removeANSIcolors(data.toString());
        logger.verbose(`Output: ${this.removeANSIcolors(data.toString())}`);
      });

      // Collect error output
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      childProcess.stderr.on('data', (data: any) => {
        shell.output += this.removeANSIcolors(data.toString());
        logger.error(`Error: ${this.removeANSIcolors(data.toString())}`);
      });

      // Set the finished flag to true on close event
      childProcess.on('close', () => {
        shell.finished = true;
        logger.info(`CLI Command finished: ${shell.command}`);
      });

      return shell;
    } catch (error) {
      throw new Error(`runCommand\nFailed to run command.\nCommand: ${command}`);
    }
  }

  /**
   * Run shell command synchronously
   * - Execute child process with the command
   * - Wait for the command to complete and return the output
   * @param command cli command, e.g. <cli> --version or any shell command
   * @param skipUpdate skip auto update notification
   * @returns command output
   */
  private static runCommandSync(command: string, skipUpdate = true): string {
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
  }

  /**
   * Logic to wait for child process to finish executing
   * - Check if the close event was emitted, else wait for 1 sec
   * - Error out if > 30 sec
   * @param shell shell object
   */
  private static async checkIfFinished(shell: ShellProcess): Promise<void | Error> {
    const timeout = 1000;
    let waitedFor = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      await this.sleep(timeout);
      if (shell.finished) {
        break;
      }
      waitedFor += timeout;
      if (waitedFor > slackCLILibConfig.waitingTimeoutGlobal) {
        // Kill the process
        kill(shell.process.pid!);
        throw new Error(
          `checkIfFinished\nFailed to finish after ${slackCLILibConfig.waitingTimeoutAction} ms.\nCommand: ${shell.command}\nCurrent output: \n${shell.output}`,
        );
      }
    }
  }

  /**
   * Sleep function used to wait for cli to finish executing
   * @param timeout ms
   */
  private static sleep(timeout = 1000): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  /**
   * Remove all the ANSI color and style encoding
   * @param text string
   */
  private static removeANSIcolors(text: string): string {
    const cleanText = text.replace(
      // eslint-disable-next-line no-control-regex
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      '',
    );
    return cleanText;
  }

  /**
   * Wait for output
   * @param expString expected string
   * @param shell
   */
  private static async waitForOutput(
    expString: string,
    shell: ShellProcess,
  ): Promise<void | Error> {
    const timeout = 1000;
    let waitedFor = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      await this.sleep(timeout);
      if (shell.output.includes(expString)) {
        break;
      }
      waitedFor += timeout;
      if (waitedFor > slackCLILibConfig.waitingTimeoutAction) {
        // Kill the process
        kill(shell.process.pid!);
        throw new Error(
          `waitForOutput\nCouldn't wait for output. ${timeout} milliseconds passed. \nExpected: ${expString}\nActual: ${shell.output}`,
        );
      }
    }
  }
}
