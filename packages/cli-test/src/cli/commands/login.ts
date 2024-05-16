import type { ShellProcess } from '../../utils/types';
import { shell } from '../shell';
import commandError from '../command-error';

export default {
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
      throw commandError(
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
      throw commandError(
        error,
        'loginChallengeExchange',
        'Error running command. \nTip: You must be authenticated in Slack client and have valid challenge and authTicket',
      );
    }
  },
};
