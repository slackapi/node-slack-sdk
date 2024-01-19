import {
  CursorPaginationEnabled,
  FileCommentArgument,
  FileArgument,
  MessageArgument,
  OptionalTeamAssignable,
  TokenOverridable,
  TraditionalPagingEnabled,
} from './common';

/** @description When starring something, it can be starred _to_ a channel. */
interface StarsChannelDestination {
  /** @description Encoded channel ID the star belongs to. */
  channel: string;
}
// https://api.slack.com/methods/stars.add & https://api.slack.com/methods/stars.remove
export type StarsAddRemoveArguments = TokenOverridable &
(StarsChannelDestination | MessageArgument | FileArgument | FileCommentArgument);
// https://api.slack.com/methods/stars.list
export interface StarsListArguments extends TokenOverridable, TraditionalPagingEnabled,
  CursorPaginationEnabled, OptionalTeamAssignable { }
