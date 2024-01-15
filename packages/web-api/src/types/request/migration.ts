import type { OptionalTeamAssignable, TokenOverridable } from './common';

// https://api.slack.com/methods/migration.exchange
export interface MigrationExchangeArguments extends TokenOverridable, OptionalTeamAssignable {
  /** @description A comma-separated list of user IDs, up to 400 per request. */
  users: string;
  /** @description Specify `true` to convert `W` global user IDs to workspace-specific `U` IDs. Defaults to `false`. */
  to_old?: boolean;
}
