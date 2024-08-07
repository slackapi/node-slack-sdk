import type { SlackCLIGlobalOptions } from '../../cli/cli-process';

export interface ProjectCommandArguments extends SlackCLIGlobalOptions {
  /**
   * @description Path to the Slack CLI-generated application to run the command in.
   * Sets the `cwd` on the shell process executing the CLI.
   */
  appPath: string;
}

export interface WorkspaceGrantArgument {
  /**
   * @description Org workspace ID, or the string `all` to request access to all workspaces in the org,
   * to request grant access to in AAA scenarios
   */
  orgWorkspaceGrantFlag?: string;
}

// Various access-modification arguments (applies to `function access` and `trigger access` calls.
/**
 * @description Single-shot grant-to-group access change arguments.
 * @example `appCollaborators: true`, or `everyone: true`
 */
export type GroupAccessChangeArguments = GrantAppCollaboratorsArgument | GrantEveryoneArgument;

interface GrantAppCollaboratorsArgument {
  /** @description Grant access for function specified by `name` to app collaborators. */
  appCollaborators: true;
}
interface GrantEveryoneArgument {
  /** @description Grant access for function specified by `name` to everyone. */
  everyone: true;
}
interface GrantArgument {
  /** @description Grant access for function specified by `name` to users specified by `users`. */
  grant: true;
}
interface RevokeArgument {
  /** @description Revoke access for function specified by `name` to users specified by `users`. */
  revoke: true;
}

/**
 * @description Grant/revoke user access arguments.
 */
export type UserAccessChangeArguments = {
  /** @description Array of user IDs to grant or revoke access to. */
  users: [string, ...string[]];
} & (RevokeArgument | GrantArgument);
/**
 * @description Grant/revoke user access arguments.
 */
export type ChannelAccessChangeArguments = {
  /** @description Array of channel IDs to grant or revoke access to. */
  channels: [string, ...string[]];
} & (RevokeArgument | GrantArgument);
/**
 * @description Grant/revoke organization access arguments.
 */
export type OrganizationAccessChangeArguments = {
  /** @description Array of organization IDs to grant or revoke access to. */
  organizations: [string, ...string[]];
} & (RevokeArgument | GrantArgument);

export interface InfoArgument {
  /** @description Whether to show access information. Supercedes all other arguments. */
  info: true;
}
