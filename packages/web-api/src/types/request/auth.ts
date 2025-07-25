import type { OptionalArgument } from '../helpers';
import type { CursorPaginationEnabled, TokenOverridable } from './common';

// https://docs.slack.dev/reference/methods/auth.revoke
export type AuthRevokeArguments = OptionalArgument<
  TokenOverridable & {
    /**
     * @description Setting this parameter to `true` triggers a testing mode where the specified token
     * will not actually be revoked.
     */
    test?: boolean;
  }
>;

// https://docs.slack.dev/reference/methods/auth.teams.list
export type AuthTeamsListArguments = OptionalArgument<
  TokenOverridable &
    CursorPaginationEnabled & {
      /**
       * @description Whether to return icon paths for each workspace.
       * An icon path represents a URI pointing to the image signifying the workspace.
       * Defaults to `false`.
       */
      include_icon?: boolean;
    }
>;

// https://docs.slack.dev/reference/methods/auth.test
export type AuthTestArguments = OptionalArgument<TokenOverridable>;
