import type { OptionalTeamAssignable, TokenOverridable } from './common';
import { OptionalArgument } from '../helpers';

// https://api.slack.com/methods/bots.info
export type BotsInfoArguments = OptionalArgument<TokenOverridable & OptionalTeamAssignable & {
  /** @description Bot ID, which starts with 'B', to retrieve information about. */
  bot?: string;
}>;
