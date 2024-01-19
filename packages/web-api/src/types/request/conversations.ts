import type {
  CursorPaginationEnabled,
  LocaleAware,
  OptionalTeamAssignable,
  TimelinePaginationEnabled,
  TokenOverridable,
} from './common';

interface Channel {
  /** @description ID of conversation. */
  channel: string;
}
interface ChannelID {
  /** @description ID of the channel that you'd like to accept. Must provide either `invite_id` or `channel_id`. */
  channel_id: string;
}
interface Emails {
  /** @description List of emails to receive this invite. Either `emails` or `user_ids` must be provided. */
  emails: string[];
  user_ids?: never;
}
interface IncludeAllMetadata {
  /** @description Return all metadata associated with messages. Defaults to `false`. */
  include_all_metadata?: boolean;
}
interface InviteID {
  /** @description ID of the invite. */
  invite_id: string;
}
interface IsPrivate {
  /** @description Whether the channel should be private. */
  is_private?: boolean;
}
interface Message extends Channel {
  /** @description Unique identifier of message. */
  ts: string;
}
interface TargetTeam {
  /** @description The team or enterprise id of the other party involved in the invitation. */
  target_team?: string;
}
interface UserIDs {
  /** List of user IDs to receive this invite. Either `emails` or `user_ids` must be provided. */
  user_ids: string[];
  emails?: never;
}
interface Users {
  /** @description A comma separated list of user IDs. Up to 1000 users may be listed. */
  users: string;
}
// https://api.slack.com/methods/conversations.acceptSharedInvite
export type ConversationsAcceptSharedInviteArguments = TokenOverridable & OptionalTeamAssignable
& (ChannelID | InviteID) & IsPrivate & {
  /**
   * @description Name of the channel. If the channel does not exist already in your workspace,
   * this name is the one that the channel will take.
   */
  channel_name: string;
  /** @description Whether you'd like to use your workspace's free trial to begin using Slack Connect. */
  free_trial_accepted?: boolean;
};

// https://api.slack.com/methods/conversations.approveSharedInvite
export interface ConversationsApproveSharedInviteArguments extends InviteID, TargetTeam, TokenOverridable {}

// https://api.slack.com/methods/conversations.archive
export interface ConversationsArchiveArguments extends Channel, TokenOverridable {}

// https://api.slack.com/methods/conversations.close
export interface ConversationsCloseArguments extends Channel, TokenOverridable {}

// https://api.slack.com/methods/conversations.create
export interface ConversationsCreateArguments extends IsPrivate, TokenOverridable, OptionalTeamAssignable {
  /** @description Name of the public or private channel to create. */
  name: string;
}

// https://api.slack.com/methods/conversations.declineSharedInvite
export interface ConversationsDeclineSharedInviteArguments extends InviteID, TargetTeam, TokenOverridable {}

// https://api.slack.com/methods/conversations.history
export interface ConversationsHistoryArguments extends Channel, IncludeAllMetadata, TokenOverridable,
  CursorPaginationEnabled, TimelinePaginationEnabled {}

// https://api.slack.com/methods/conversations.info
export interface ConversationsInfoArguments extends Channel, TokenOverridable, LocaleAware {
  /** @description Set to `true` to include the member count for the specified conversation. Defaults to `false`. */
  include_num_members?: boolean;
}

// https://api.slack.com/methods/conversations.invite
export interface ConversationsInviteArguments extends Channel, Users, TokenOverridable {
  /**
   * @description When set to `true` and multiple user IDs are provided, continue inviting the valid ones while
   * disregarding invalid IDs. Defaults to `false`.
   */
  force?: boolean;
}

// https://api.slack.com/methods/conversations.inviteShared
export type ConversationsInviteSharedArguments = Channel & TokenOverridable & (Emails | UserIDs) & {
  /** @description Whether invite is to an external limited member. Defaults to `true`. */
  external_limited?: boolean;
};

// https://api.slack.com/methods/conversations.join
export interface ConversationsJoinArguments extends Channel, TokenOverridable {}

// https://api.slack.com/methods/conversations.kick
export interface ConversationsKickArguments extends Channel, TokenOverridable {
  user: string;
}

// https://api.slack.com/methods/conversations.leave
export interface ConversationsLeaveArguments extends Channel, TokenOverridable {}

// https://api.slack.com/methods/conversations.list
export interface ConversationsListArguments extends TokenOverridable, CursorPaginationEnabled, OptionalTeamAssignable {
  /** @description Set to `true` to exclude archived channels from the list. Defaults to `false`. */
  exclude_archived?: boolean;
  /**
   * @description Mix and match channel types by providing a comma-separated list of any combination of:
   * `public_channel`, `private_channel`, `mpim` or `im`. Defaults to `public_channel`.
   */
  types?: string;
}

// https://api.slack.com/methods/conversations.listConnectInvites
export interface ConversationsListConnectInvitesArguments extends TokenOverridable, OptionalTeamAssignable {
  /** @description Maximum number of invites to return. Defaults to `100`. */
  count?: number;
  /** @description Set to `next_cursor` returned by previous call to list items in subsequent page. */
  cursor?: string;
}

// https://api.slack.com/methods/conversations.mark
export interface ConversationsMarkArguments extends Message, TokenOverridable { }

// https://api.slack.com/methods/conversations.members
export interface ConversationsMembersArguments extends Channel, TokenOverridable, CursorPaginationEnabled {}

// https://api.slack.com/methods/conversations.open
export type ConversationsOpenArguments = (Channel | Users) & TokenOverridable & {
  /**
   * @description Do not create a direct message or multi-person direct message.
   * This is used to see if there is an existing dm or mpdm.
   */
  prevent_creation?: boolean;
  /** @description Indicates you want the full IM channel definition in the response. */
  return_im?: boolean;
};

// https://api.slack.com/methods/conversations.rename
export interface ConversationsRenameArguments extends Channel, TokenOverridable {
  /** @description New name for conversation. */
  name: string;
}

// https://api.slack.com/methods/conversations.replies
export interface ConversationsRepliesArguments extends Message, IncludeAllMetadata, TokenOverridable,
  CursorPaginationEnabled, TimelinePaginationEnabled {}

// https://api.slack.com/methods/conversations.setPurpose
export interface ConversationsSetPurposeArguments extends Channel, TokenOverridable {
  /** @description A new, specialer purpose. */
  purpose: string;
}

// https://api.slack.com/methods/conversations.setTopic
export interface ConversationsSetTopicArguments extends Channel, TokenOverridable {
  /** @description The new topic string. Does not support formatting or linkification. */
  topic: string;
}

// https://api.slack.com/methods/conversations.unarchive
export interface ConversationsUnarchiveArguments extends Channel, TokenOverridable {}
