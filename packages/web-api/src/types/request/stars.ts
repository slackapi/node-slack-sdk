import { CursorPaginationEnabled, OptionalTeamAssignable, TokenOverridable, TraditionalPagingEnabled } from './common';

// TODO: usage info for stars.add recommends retiring use of any stars APIs: https://api.slack.com/methods/stars.add#markdown

/** @description When starring something, it can be starred _to_ a channel. */
interface StarsChannelDestination {
  /** @description Encoded channel ID the star belongs to. */
  channel: string;
}
/** @description Messages can be starred. */
interface StarsMessageArgument {
  /** @description Encoded channel ID housing the message. */
  channel: string;
  /** @description Timestamp of the message. */
  timestamp: string;
}
/** @description Files can be starred. */
interface StarsFileArgument {
  /** @description Encoded file ID. */
  file: string;
}
/** @description File comments can be starred. */
interface StarsFileCommentArgument {
  /** @description Encoded file comment ID. */
  file_comment: string;
}

// https://api.slack.com/methods/stars.add & https://api.slack.com/methods/stars.remove
export type StarsAddRemoveArguments = TokenOverridable &
(StarsChannelDestination | StarsMessageArgument | StarsFileArgument | StarsFileCommentArgument);
// https://api.slack.com/methods/stars.list
export interface StarsListArguments extends TokenOverridable, TraditionalPagingEnabled,
  CursorPaginationEnabled, OptionalTeamAssignable { }
