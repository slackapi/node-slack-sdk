import { OptionalTeamAssignable, TokenOverridable } from './common';
import { OptionalArgument } from '../helpers';

// https://api.slack.com/methods/dnd.endDnd
export type DndEndDndArguments = OptionalArgument<TokenOverridable>;
// https://api.slack.com/methods/dnd.endSnooze
export type DndEndSnoozeArguments = OptionalArgument<TokenOverridable>;
// https://api.slack.com/methods/dnd.info
export type DndInfoArguments = OptionalArgument<TokenOverridable & OptionalTeamAssignable & {
  /** @description User to fetch status for (defaults to authed user). */
  user?: string;
}>;
// https://api.slack.com/methods/dnd.setSnooze
export interface DndSetSnoozeArguments extends TokenOverridable {
  /** @description Number of minutes, from now, to snooze until. */
  num_minutes: number;
}
// https://api.slack.com/methods/dnd.teamInfo
export interface DndTeamInfoArguments extends TokenOverridable, OptionalTeamAssignable {
  /** @description Comma-separated list of users to fetch Do Not Disturb status for. */
  users: string;
}
