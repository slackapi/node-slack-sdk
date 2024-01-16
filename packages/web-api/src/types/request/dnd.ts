import { OptionalTeamAssignable, TokenOverridable } from './common';

// https://api.slack.com/methods/dnd.endDnd
export interface DndEndDndArguments extends TokenOverridable { }
// https://api.slack.com/methods/dnd.endSnooze
export interface DndEndSnoozeArguments extends TokenOverridable { }
// https://api.slack.com/methods/dnd.info
export interface DndInfoArguments extends TokenOverridable, OptionalTeamAssignable {
  /** @description User to fetch status for (defaults to authed user). */
  user?: string;
}
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
