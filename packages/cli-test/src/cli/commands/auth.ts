import {
  type SlackCLICommandOptions,
  type SlackCLIGlobalOptions,
  type SlackCLIHostTargetOptions,
  SlackCLIProcess,
} from '../cli-process';

import type { ShellProcess } from '../../types/shell';

export default {
  /**
   *  `slack login --no-prompt`; initiates a CLI login flow. The `authTicketSlashCommand` returned should be entered
   *  into the Slack client, and the challenge code retrieved and fed into the `loginChallengeExchange` method to
   *  complete the CLI login flow.
   */
  loginNoPrompt: async function loginNoPrompt(args?: SlackCLIHostTargetOptions): Promise<{
    /** @description Command output */
    output: ShellProcess['output'];
    /**
     * @description Slash command that a Slack client user must enter into the message composer in order to initiate
     * login flow.
     * @example `/slackauthticket MTMxNjgxMDUtYTYwOC00NzRhLWE3M2YtMjVmZTQyMjc1MDg4`
     */
    authTicketSlashCommand: string;
    /**
     * An auth ticket is a A UUID sequence granted by Slack to a CLI auth requestor.
     * That ticket must then be submitted via slash command by a user logged in to Slack and permissions accepted to be
     * granted a token for use. This `authTicket` is included in the `authTicketSlashCommand`.
     */
    authTicket: string;
  }> {
    const cmd = new SlackCLIProcess('login', args, {
      '--no-prompt': true,
    });
    const proc = await cmd.execAsync();

    // Get auth token
    const authTicketSlashCommand = proc.output.match('/slackauthticket(.*)')?.[0];
    if (!authTicketSlashCommand) {
      throw new Error(
        `Could not extract \`/slackauthticket\` output from \`login --no-prompt\` command! Output: ${proc.output}`,
      );
    }
    const authTicket = authTicketSlashCommand.split(' ')[1];

    return {
      output: proc.output,
      authTicketSlashCommand,
      authTicket,
    };
  },

  /**
   * `slack login --no-prompt --challenge --ticket`
   * @param authTicket authTicket string from loginNoPrompt
   * @param options
   * @returns
   */
  loginChallengeExchange: async function loginChallengeExchange(
    args: SlackCLIHostTargetOptions & {
      /** @description Challenge string extracted from the Slack client UI after submitting the auth slash command. */
      challenge: string;
      /** @description The `authTicket` output from `loginNoPrompt`; required to complete the login flow. */
      authTicket: string;
    },
  ): Promise<string> {
    const cmd = new SlackCLIProcess('login', args, {
      '--no-prompt': true,
      '--challenge': args.challenge,
      '--ticket': args.authTicket,
    });
    const proc = await cmd.execAsync();
    return proc.output;
  },

  /**
   * `slack logout`
   * @returns command output
   */
  logout: async function logout(
    args?: Omit<SlackCLIGlobalOptions, 'team'> &
      (
        | Pick<SlackCLIGlobalOptions, 'team'>
        | {
            /**
             * @description Perform the logout for all authentications.
             * The `team` argument takes precendence over this argument.
             */
            all?: boolean;
          }
      ),
  ): Promise<string> {
    // Create the command with workspaces to logout of
    const cmdOpts: SlackCLICommandOptions = {};
    if (args && 'all' in args && !('team' in args) && args.all) {
      cmdOpts['--all'] = true;
    }
    const cmd = new SlackCLIProcess('logout', args, cmdOpts);
    const proc = await cmd.execAsync();
    return proc.output;
  },
};
