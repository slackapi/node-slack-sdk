import type { OptionalTeamAssignable, TokenOverridable } from './common';

// https://api.slack.com/methods/bots.info
export interface BotsInfoArguments extends TokenOverridable, OptionalTeamAssignable {
  /** @description Bot user ID to retrieve information about. */
  bot?: string;
}
