import type { CursorPaginationEnabled, TokenOverridable } from './common';
import { OptionalArgument } from '../helpers';

// https://api.slack.com/methods/auth.revoke
export interface AuthRevokeArguments extends TokenOverridable {
  /**
   * @description Setting this parameter to `true` triggers a testing mode where the specified token
   * will not actually be revoked.
   */
  test?: boolean;
}

// https://api.slack.com/methods/auth.teams.list
export interface AuthTeamsListArguments extends TokenOverridable, CursorPaginationEnabled {
  /**
   * @description Whether to return icon paths for each workspace.
   * An icon path represents a URI pointing to the image signifying the workspace.
   * Defaults to `false`.
   */
  include_icon?: boolean;
}

// https://api.slack.com/methods/auth.test
export type AuthTestArguments = OptionalArgument<TokenOverridable>;
