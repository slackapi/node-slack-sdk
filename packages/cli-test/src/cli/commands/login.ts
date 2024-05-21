import type { ShellProcess } from '../../utils/types';
import { SlackCLIProcess } from '../cli-process';
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
    const cmd = new SlackCLIProcess('login', options, {
      '--no-prompt': null,
    });
    try {
      const proc = await cmd.execAsync();

      // Get auth token
      const authTicketSlashCommand = proc.output.match('/slackauthticket(.*)')![0];
      const authTicket = authTicketSlashCommand.split(' ')[1];

      return {
        shellOutput: proc.output,
        authTicketSlashCommand,
        authTicket,
      };
    } catch (error) {
      throw commandError(
        error,
        this.loginNoPrompt.name,
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
    const cmd = new SlackCLIProcess('login', options, {
      '--no-prompt': null,
      '--challenge': challenge,
      '--ticket': authTicket,
    });
    try {
      const proc = await cmd.execAsync();
      return proc.output;
    } catch (error) {
      throw commandError(
        error,
        this.loginChallengeExchange.name,
        'Error running command. \nTip: You must be authenticated in Slack client and have valid challenge and authTicket',
      );
    }
  },
};
