import {
  CursorPaginationEnabled,
  FileArgument,
  FileCommentArgument,
  MessageArgument,
  OptionalTeamAssignable,
  TokenOverridable,
  TraditionalPagingEnabled,
} from './common';

interface ReactionsFull {
  /** @description If `true`, return the complete reaction list. */
  full?: boolean;
}
interface ReactionName {
  /** @description Reaction (emoji) name. */
  name: string;
}
// https://api.slack.com/methods/reactions.add
export interface ReactionsAddArguments extends MessageArgument, TokenOverridable, ReactionName {}
// https://api.slack.com/methods/reactions.get
export type ReactionsGetArguments = ReactionsFull & TokenOverridable &
(MessageArgument | FileArgument | FileCommentArgument);

// https://api.slack.com/methods/reactions.list
export interface ReactionsListArguments extends ReactionsFull, TokenOverridable, TraditionalPagingEnabled,
  CursorPaginationEnabled, OptionalTeamAssignable {
  /** @description Show reactions made by this user. Defaults to the authed user. */
  user?: string;
}
// https://api.slack.com/methods/reactions.remove
export type ReactionsRemoveArguments = TokenOverridable & ReactionName &
(MessageArgument | FileArgument | FileCommentArgument);
