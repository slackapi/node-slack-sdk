import { SlackCLICommandOptions, SlackCLIGlobalOptions, SlackCLIProcess } from '../cli-process';
import commandError from '../command-error';

import type { ShellProcess } from '../../utils/types';

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
      '--no-prompt': true,
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

  // TODO: (breaking change) inconsistent use of object-as-params vs. separate parameters
  /**
   * `slack login --no-prompt --challenge --ticket`
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
      '--no-prompt': true,
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

  /**
   * `slack logout`
   * @returns command output
   */
  logout: async function logout(options?: {
    // TODO: (breaking change) the two flags here are mutually exclusive; model better using an `|` of types
    /** team domain to logout from */
    teamFlag?: string;
    /** perform the logout for all authentications */
    allWorkspaces?: boolean;
    qa?: boolean;
  }): Promise<string> {
    // TODO: (breaking change) inconsistent use of object-as-params vs. separate parameters
    // Create the command with workspaces to logout of
    const globalOpts: SlackCLIGlobalOptions = { qa: options?.qa };
    const cmdOpts: SlackCLICommandOptions = {};
    if (options?.teamFlag) {
      globalOpts.team = options.teamFlag;
    } else if (options?.allWorkspaces) {
      cmdOpts['--all'] = true;
    }
    const cmd = new SlackCLIProcess('logout', globalOpts, cmdOpts);
    try {
      const proc = await cmd.execAsync();
      return proc.output;
    } catch (error) {
      throw commandError(error, 'logout');
    }
  },
};
