import { WebAPICallOptions, WebAPIResultCallback, WebAPICallResult } from './WebClient';

// NOTE: could create a named type alias like data types like `SlackUserID: string`
// NOTE: not clear if these interfaces should be exported at the top-level

/**
 * Generic method definition
 */
export default interface Method<MethodArguments extends WebAPICallOptions> {
  // TODO: can we create a relationship between MethodArguments and a MethodResult type?
  (options?: MethodArguments & AuxiliaryArguments): Promise<WebAPICallResult>;
  (options: MethodArguments & AuxiliaryArguments, callback: WebAPIResultCallback): void;
}

/*
 * Reusable "protocols" that some MethodArguments types can conform to
 */

export interface AuxiliaryArguments {
  [unknownArg: string]: any;
}

export interface TokenOverridable {
  token?: string;
}

export interface CursorPaginationEnabled {
  limit?: number; // natural integer, max of 1000
  cursor?: string; // find this in a response's `response_metadata.next_cursor`
}

export interface TimelinePaginationEnabled {
  oldest?: string;
  latest?: string;
  inclusive?: boolean;
}

export interface LocaleAware {
  include_locale?: boolean;
}

/*
 * Reusable shapes for argument values
 */
export interface MessageAttachment {
  fallback?: string; // either this or text must be defined
  color?: 'good' | 'warning' | 'danger' | string;
  pretext?: string;
  author_name?: string;
  author_link?: string; // author_name must be present
  author_icon?: string; // author_name must be present
  title?: string;
  title_link?: string; // title must be present
  text?: string; // either this or fallback must be defined
  fields?: {
    title: string;
    value: string;
    short?: boolean;
  }[];
  image_url?: string;
  thumb_url?: string;
  footer?: string;
  footer_icon?: string; // footer must be present
  ts?: string;
  actions?: { // note: this is a very minimal definition of link buttons, interactive buttons, and message menus
    type: string;
    text?: string;
  }[];
}

export interface LinkUnfurls {
  [linkUrl: string]: MessageAttachment;
}

/*
 * MethodArguments types (no formal relationship other than the generic constraint in Method<>)
 */

  /*
   * `api.*`
   */
export type APITestArguments = {};

  /*
   * `apps.*`
   */
export type AppsPermissionsInfoArguments = TokenOverridable & {};
export type AppsPermissionsRequestArguments = TokenOverridable & {
  scopes: string; // comma-separated list of scopes
  trigger_id: string;
};

  /*
   * `auth.*`
   */
export type AuthRevokeArguments = TokenOverridable & {
  test: boolean;
};
export type AuthTestArguments = TokenOverridable & {};

  /*
   * `bots.*`
   */
export type BotsInfoArguments = TokenOverridable & {
  bot?: string;
};

  /*
   * `channels.*`
   */
export type ChannelsArchiveArguments = TokenOverridable & {
  channel: string;
};
export type ChannelsCreateArguments = TokenOverridable & {
  name: string;
  validate?: boolean;
};
export type ChannelsHistoryArguments = TokenOverridable & TimelinePaginationEnabled & {
  channel: string;
  count?: number;
  unreads?: boolean;
};
export type ChannelsInfoArguments = TokenOverridable & LocaleAware & {
  channel: string;
};
export type ChannelsInviteArguments = TokenOverridable & {
  channel: string;
  user: string;
};
export type ChannelsJoinArguments = TokenOverridable & {
  name: string;
  validate: boolean;
};
export type ChannelsKickArguments = TokenOverridable & {
  channel: string;
  user: string;
};
export type ChannelsLeaveArguments = TokenOverridable & {
  channel: string;
};
export type ChannelsListArguments = TokenOverridable & CursorPaginationEnabled & {
  exclude_archived: boolean;
  exclude_members: boolean;
};
export type ChannelsMarkArguments = TokenOverridable & {
  channel: string;
  ts: string;
};
export type ChannelsRenameArguments = TokenOverridable & {
  channel: string;
  name: string;
  validate?: boolean;
};
export type ChannelsRepliesArguments = TokenOverridable & {
  channel: string;
  thread_ts: string;
};
export type ChannelsSetPurposeArguments = TokenOverridable & {
  channel: string;
  purpose: string;
};
export type ChannelsSetTopicArguments = TokenOverridable & {
  channel: string;
  topic: string;
};
export type ChannelsUnarchiveArguments = TokenOverridable & {
  channel: string;
};

  /*
   * `chat.*`
   */
export type ChatDeleteArguments = TokenOverridable & {
  channel: string;
  ts: string;
  as_user?: boolean
};
export type ChatGetPermalinkArguments = TokenOverridable & {
  channel: string;
  message_ts: string;
};
export type ChatMeMessageArguments = TokenOverridable & {
  channel: string;
  text: string;
};
export type ChatPostEphemeralArguments = TokenOverridable & {
  channel: string;
  text: string;
  user: string;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  link_names?: boolean;
  parse?: 'full' | 'none';
};
export type ChatPostMessageArguments = TokenOverridable & {
  channel: string;
  text: string;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  icon_emoji?: string; // if specified, as_user must be false
  icon_url?: string;
  link_names?: boolean;
  mrkdwn?: boolean;
  parse?: 'full' | 'none';
  reply_broadcast?: boolean; // if specified, thread_ts must be set
  thread_ts?: string;
  unfurl_links?: boolean;
  unfurl_media?: boolean;
  username?: string; // if specified, as_user must be false
};
export type ChatUnfurlArguments = TokenOverridable & {
  channel: string;
  ts: string;
  unfurls: LinkUnfurls;
  user_auth_message?: string;
  user_auth_required?: boolean;
  user_auth_url?: string;
};
export type ChatUpdateArguments = TokenOverridable & {
  channel: string;
  text: string;
  ts: string;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  link_names?: boolean;
  parse?: 'full' | 'none';
};

// TODO: fill out the rest of these arugment types

  /*
   * `conversations.*`
   */
export type ConversationsArchiveArguments = TokenOverridable & {};
export type ConversationsCloseArguments = TokenOverridable & {};
export type ConversationsCreateArguments = TokenOverridable & {};
export type ConversationsHistoryArguments = TokenOverridable & {};
export type ConversationsInfoArguments = TokenOverridable & {};
export type ConversationsInviteArguments = TokenOverridable & {};
export type ConversationsJoinArguments = TokenOverridable & {};
export type ConversationsKickArguments = TokenOverridable & {};
export type ConversationsLeaveArguments = TokenOverridable & {};
export type ConversationsListArguments = TokenOverridable & {};
export type ConversationsMembersArguments = TokenOverridable & {};
export type ConversationsOpenArguments = TokenOverridable & {};
export type ConversationsRenameArguments = TokenOverridable & {};
export type ConversationsRepliesArguments = TokenOverridable & {};
export type ConversationsSetPurposeArguments = TokenOverridable & {};
export type ConversationsSetTopicArguments = TokenOverridable & {};
export type ConversationsUnarchiveArguments = TokenOverridable & {};

  /*
   * `dialog.*`
   */
export type DialogOpenArguments = TokenOverridable & {};

  /*
   * `dnd.*`
   */
export type DndEndDndArguments = TokenOverridable & {};
export type DndEndSnoozeArguments = TokenOverridable & {};
export type DndInfoArguments = TokenOverridable & {};
export type DndSetSnoozeArguments = TokenOverridable & {};
export type DndTeamInfoArguments = TokenOverridable & {};

  /*
   * `emoji.*`
   */
export type EmojiListArguments = TokenOverridable & {};

  /*
   * `files.*`
   */
export type FilesDeleteArguments = TokenOverridable & {};
export type FilesInfoArguments = TokenOverridable & {};
export type FilesListArguments = TokenOverridable & {};
export type FilesRevokePublicURLArguments = TokenOverridable & {};
export type FilesSharedPublicURLArguments = TokenOverridable & {};
export type FilesUploadArguments = TokenOverridable & {};
export type FilesCommentsAddArguments = TokenOverridable & {};
export type FilesCommentsDeleteArguments = TokenOverridable & {};
export type FilesCommentsEditArguments = TokenOverridable & {};

  /*
   * `groups.*`
   */
export type GroupsArchiveArguments = TokenOverridable & {};
export type GroupsCreateArguments = TokenOverridable & {};
export type GroupsCreateChildArguments = TokenOverridable & {};
export type GroupsHistoryArguments = TokenOverridable & {};
export type GroupsInfoArguments = TokenOverridable & {};
export type GroupsInviteArguments = TokenOverridable & {};
export type GroupsKickArguments = TokenOverridable & {};
export type GroupsLeaveArguments = TokenOverridable & {};
export type GroupsListArguments = TokenOverridable & {};
export type GroupsMarkArguments = TokenOverridable & {};
export type GroupsOpenArguments = TokenOverridable & {};
export type GroupsRenameArguments = TokenOverridable & {};
export type GroupsRepliesArguments = TokenOverridable & {};
export type GroupsSetPurposeArguments = TokenOverridable & {};
export type GroupsSetTopicArguments = TokenOverridable & {};
export type GroupsUnarchiveArguments = TokenOverridable & {};

  /*
   * `im.*`
   */
export type IMCloseArguments = TokenOverridable & {};
export type IMHistoryArguments = TokenOverridable & {};
export type IMListArguments = TokenOverridable & {};
export type IMMarkArguments = TokenOverridable & {};
export type IMOpenArguments = TokenOverridable & {};
export type IMRepliesArguments = TokenOverridable & {};

  /*
   * `migration.*`
   */
export type MigrationExchangeArguments = TokenOverridable & {};

  /*
   * `mpim.*`
   */
export type MPIMCloseArguments = TokenOverridable & {};
export type MPIMHistoryArguments = TokenOverridable & {};
export type MPIMListArguments = TokenOverridable & {};
export type MPIMMarkArguments = TokenOverridable & {};
export type MPIMOpenArguments = TokenOverridable & {};
export type MPIMRepliesArguments = TokenOverridable & {};

  /*
   * `oauth.*`
   */
export type OAuthAccessArguments = {
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri?: string;
};
export type OAuthTokenArguments = {
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri?: string;
  single_channel?: '0' | '1';
};

  /*
   * `pins.*`
   */
export type PinsAddArguments = TokenOverridable & {};
export type PinsListArguments = TokenOverridable & {};
export type PinsRemoveArguments = TokenOverridable & {};

  /*
   * `reactions.*`
   */
export type ReactionsAddArguments = TokenOverridable & {};
export type ReactionsGetArguments = TokenOverridable & {};
export type ReactionsListArguments = TokenOverridable & {};
export type ReactionsRemoveArguments = TokenOverridable & {};

  /*
   * `reminders.*`
   */
export type RemindersAddArguments = TokenOverridable & {};
export type RemindersCompleteArguments = TokenOverridable & {};
export type RemindersDeleteArguments = TokenOverridable & {};
export type RemindersInfoArguments = TokenOverridable & {};
export type RemindersListArguments = TokenOverridable & {};

  /*
   * `rtm.*`
   */
export type RTMConnectArguments = TokenOverridable & {};
export type RTMStartArguments = TokenOverridable & {};

  /*
   * `search.*`
   */
export type SearchAllArguments = TokenOverridable & {};
export type SearchFilesArguments = TokenOverridable & {};
export type SearchMessagesArguments = TokenOverridable & {};

  /*
   * `stars.*`
   */
export type StarsAddArguments = TokenOverridable & {};
export type StarsListArguments = TokenOverridable & {};
export type StarsRemoveArguments = TokenOverridable & {};

  /*
   * `team.*`
   */
export type TeamAccessLogsArguments = TokenOverridable & {};
export type TeamBillableInfoArguments = TokenOverridable & {};
export type TeamInfoArguments = TokenOverridable & {};
export type TeamIntegrationLogsArguments = TokenOverridable & {};
export type TeamProfileGetArguments = TokenOverridable & {};

  /*
   * `usergroups.*`
   */
export type UsergroupsCreateArguments = TokenOverridable & {};
export type UsergroupsDisableArguments = TokenOverridable & {};
export type UsergroupsEnableArguments = TokenOverridable & {};
export type UsergroupsListArguments = TokenOverridable & {};
export type UsergroupsUpdateArguments = TokenOverridable & {};
export type UsergroupsUsersListArguments = TokenOverridable & {};
export type UsergroupsUsersUpdateArguments = TokenOverridable & {};

  /*
   * `users.*`
   */
export type UsersInfoArguments = TokenOverridable & {
  user: string;
};
export type UsersListArguments = TokenOverridable & CursorPaginationEnabled & LocaleAware & {
  presence?: boolean; // deprecated, defaults to false
};
export type UsersLookupByEmailArguments = TokenOverridable & {
  email: string;
};
export type UsersGetPresenceArguments = TokenOverridable & {
  user: string;
};
export type UsersIdentityArguments = TokenOverridable & {};
export type UsersSetActiveArguments = TokenOverridable & {};
export type UsersSetPhotoArguments = TokenOverridable & {
  image: string; // TODO: file contents what?
  crop_w?: number;
  crop_x?: number;
  crop_y?: number;
};
export type UsersDeletePhotoArguments = TokenOverridable & {};
export type UsersSetPresenceArguments = TokenOverridable & {
  presence: 'auto' | 'away';
};
export type UsersProfileGetArguments = TokenOverridable & {};
export type UsersProfileSetArguments = TokenOverridable & {};
