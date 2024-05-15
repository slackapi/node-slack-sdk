import * as child from 'child_process';

/**
 * Slack CLI specific variables
 */

/**
 * Shell process type
 */
export interface ShellProcess {
  /**
   * Child process object
   */
  process: child.ChildProcessWithoutNullStreams;
  /**
   * Command output
   */
  output: string;
  /**
   * Process state
   */
  finished: boolean;
  /**
   * Command string
   */
  command: string;
}

/**
 * login --no-prompt command results type
 */
export interface LoginNoPromptResult {
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
