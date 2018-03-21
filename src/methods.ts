import { Stream } from 'stream';
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
export interface Dialog {
  title: string;
  callback_id: string;
  elements: {
    type: 'text' | 'textarea' | 'select';
    name: string; // shown to user
    label: string; // shown to user
    optional?: boolean;
    placeholder?: string;
    value?: string; // sent to app
    // types `text` & `textarea`:
    max_length?: number;
    min_length?: number;
    hint?: string;
    subtype?: 'email' | 'number' | 'tel' | 'url';
    // type `select`:
    options?: {
      label: string; // shown to user
      value: string; // sent to app
    }[];
  }[];
  submit_label?: string;
}

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

  /*
   * `conversations.*`
   */
export type ConversationsArchiveArguments = TokenOverridable & {
  channel: string;
};
export type ConversationsCloseArguments = TokenOverridable & {
  channel: string;
};
export type ConversationsCreateArguments = TokenOverridable & {
  name: string;
  is_private?: boolean;
};
export type ConversationsHistoryArguments = TokenOverridable & CursorPaginationEnabled & TimelinePaginationEnabled & {
  channel: string;
};
export type ConversationsInfoArguments = TokenOverridable & LocaleAware & {
  channel: string;
};
export type ConversationsInviteArguments = TokenOverridable & {
  channel: string;
  users: string; // comma-separated list of users
};
export type ConversationsJoinArguments = TokenOverridable & {
  channel: string;
};
export type ConversationsKickArguments = TokenOverridable & {
  channel: string;
  user: string;
};
export type ConversationsLeaveArguments = TokenOverridable & {
  channel: string;
};
export type ConversationsListArguments = TokenOverridable & CursorPaginationEnabled & {
  exclude_archived?: boolean;
  types?: string; // comma-separated list of conversation types
};
export type ConversationsMembersArguments = TokenOverridable & CursorPaginationEnabled & {
  channel: string;
};
export type ConversationsOpenArguments = TokenOverridable & {
  channel?: string;
  users?: string; // comma-separated list of users
  return_im?: boolean;
};
export type ConversationsRenameArguments = TokenOverridable & {
  channel: string;
  name: string;
};
export type ConversationsRepliesArguments = TokenOverridable & CursorPaginationEnabled & TimelinePaginationEnabled & {
  channel: string;
  ts: string;
};
export type ConversationsSetPurposeArguments = TokenOverridable & {
  channel: string;
  purpose: string;
};
export type ConversationsSetTopicArguments = TokenOverridable & {
  channel: string;
  topic: string;
};
export type ConversationsUnarchiveArguments = TokenOverridable & {
  channel: string;
};

  /*
   * `dialog.*`
   */
export type DialogOpenArguments = TokenOverridable & {
  trigger_id: string;
  dialog: Dialog;
};

  /*
   * `dnd.*`
   */
export type DndEndDndArguments = TokenOverridable;
export type DndEndSnoozeArguments = TokenOverridable;
export type DndInfoArguments = TokenOverridable & {
  user: string;
};
export type DndSetSnoozeArguments = TokenOverridable & {
  num_minutes: number;
};
export type DndTeamInfoArguments = TokenOverridable & {
  users?: string; // comma-separated list of users
};

  /*
   * `emoji.*`
   */
export type EmojiListArguments = TokenOverridable;

  /*
   * `files.*`
   */
export type FilesDeleteArguments = TokenOverridable & {
  file: string; // file id
};
export type FilesInfoArguments = TokenOverridable & {
  file: string; // file id
  count?: number;
  page?: number;
};
export type FilesListArguments = TokenOverridable & {
  channel?: string;
  user?: string;
  count?: number;
  page?: number;
  ts_from?: string;
  ts_to?: string;
  types?: string; // comma-separated list of file types
};
export type FilesRevokePublicURLArguments = TokenOverridable & {
  file: string; // file id
};
export type FilesSharedPublicURLArguments = TokenOverridable & {
  file: string; // file id
};
export type FilesUploadArguments = TokenOverridable & {
  channels?: string; // comma-separated list of channels
  content?: string; // if absent, must provide `file`
  file?: Buffer | Stream; // if absent, must provide `content`
  filename?: string;
  filetype?: string;
  initial_comment?: string;
  title?: string;
};
export type FilesCommentsAddArguments = TokenOverridable & {
  comment: string;
  file: string; // file id
};
export type FilesCommentsDeleteArguments = TokenOverridable & {
  file: string; // file id
  id: string; // comment id
};
export type FilesCommentsEditArguments = TokenOverridable & {
  comment: string;
  file: string; // file id
  id: string; // comment id
};

  /*
   * `groups.*`
   */
export type GroupsArchiveArguments = TokenOverridable & {
  channel: string;
};
export type GroupsCreateArguments = TokenOverridable & {
  name: string;
  validate?: boolean;
};
export type GroupsCreateChildArguments = TokenOverridable & {
  channel: string;
};
export type GroupsHistoryArguments = TokenOverridable & CursorPaginationEnabled & TimelinePaginationEnabled & {
  channel: string;
  unreads?: boolean;
};
export type GroupsInfoArguments = TokenOverridable & LocaleAware & {
  channel: string;
};
export type GroupsInviteArguments = TokenOverridable & {
  channel: string;
  user: string;
};
export type GroupsKickArguments = TokenOverridable & {
  channel: string;
  user: string;
};
export type GroupsLeaveArguments = TokenOverridable & {
  channel: string;
};
export type GroupsListArguments = TokenOverridable & {
  exclude_archived?: boolean;
  exclude_members?: boolean;
};
export type GroupsMarkArguments = TokenOverridable & {
  channel: string;
  ts: string;
};
export type GroupsOpenArguments = TokenOverridable & {
  channel: string;
};
export type GroupsRenameArguments = TokenOverridable & {
  channel: string;
  name: string;
  validate?: boolean;
};
export type GroupsRepliesArguments = TokenOverridable & {
  channel: string;
  thread_ts: boolean;
};
export type GroupsSetPurposeArguments = TokenOverridable & {
  channel: string;
  purpose: string;
};
export type GroupsSetTopicArguments = TokenOverridable & {
  channel: string;
  topic: string;
};
export type GroupsUnarchiveArguments = TokenOverridable & {
  channel: string;
};

  /*
   * `im.*`
   */
export type IMCloseArguments = TokenOverridable & {
  channel: string;
};
export type IMHistoryArguments = TokenOverridable & TimelinePaginationEnabled & {
  channel: string;
  count?: number;
  unreads?: boolean;
};
export type IMListArguments = TokenOverridable & CursorPaginationEnabled;
export type IMMarkArguments = TokenOverridable & {
  channel: string;
  ts: string;
};
export type IMOpenArguments = TokenOverridable & LocaleAware & {
  user: string;
  return_im?: boolean;
};
export type IMRepliesArguments = TokenOverridable & {
  channel: string;
  thread_ts?: string;
};

  /*
   * `migration.*`
   */
export type MigrationExchangeArguments = TokenOverridable & {
  users: string; // comma-separated list of users
  to_old?: boolean;
};

  /*
   * `mpim.*`
   */
export type MPIMCloseArguments = TokenOverridable & {
  channel: string;
};
export type MPIMHistoryArguments = TokenOverridable & TimelinePaginationEnabled & {
  channel: string;
  count?: number;
  unreads?: boolean;
};
export type MPIMListArguments = TokenOverridable;
export type MPIMMarkArguments = TokenOverridable & {
  channel: string;
  ts: string;
};
export type MPIMOpenArguments = TokenOverridable & {
  users: string; // comma-separated list of users
};
export type MPIMRepliesArguments = TokenOverridable & {
  channel: string;
  thread_ts: string;
};

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
export type PinsAddArguments = TokenOverridable & {
  channel: string;
  // must supply one of:
  file?: string; // file id
  file_comment?: string;
  timestamp?: string;
};
export type PinsListArguments = TokenOverridable & {
  channel: string;
};
export type PinsRemoveArguments = TokenOverridable & {
  channel: string;
  // must supply one of:
  file?: string; // file id
  file_comment?: string;
  timestamp?: string;
};

  /*
   * `reactions.*`
   */
export type ReactionsAddArguments = TokenOverridable & {
  name: string;
  // must supply one of:
  channel?: string; // paired with timestamp
  timestamp?: string; // paired with channel
  file?: string; // file id
  file_comment?: string;
};
export type ReactionsGetArguments = TokenOverridable & {
  full?: boolean;
  // must supply one of:
  channel?: string; // paired with timestamp
  timestamp?: string; // paired with channel
  file?: string; // file id
  file_comment?: string;
};
export type ReactionsListArguments = TokenOverridable & {
  user?: string;
  count?: number;
  page?: number;
  full?: boolean;
};
export type ReactionsRemoveArguments = TokenOverridable & {
  name: string;
  // must supply one of:
  channel?: string; // paired with timestamp
  timestamp?: string; // paired with channel
  file?: string; // file id
  file_comment?: string;
};

  /*
   * `reminders.*`
   */
export type RemindersAddArguments = TokenOverridable & {
  text: string;
  time: string | number;
  user?: string;
};
export type RemindersCompleteArguments = TokenOverridable & {
  reminder: string;
};
export type RemindersDeleteArguments = TokenOverridable & {
  reminder: string;
};
export type RemindersInfoArguments = TokenOverridable & {
  reminder: string;
};
export type RemindersListArguments = TokenOverridable;

  /*
   * `rtm.*`
   */
export type RTMConnectArguments = TokenOverridable & {
  batch_presence_aware?: boolean;
  presence_sub?: boolean;
};
export type RTMStartArguments = TokenOverridable & LocaleAware & {
  batch_presence_aware?: boolean;
  mpim_aware?: boolean;
  no_latest?: '0' | '1';
  no_unreads?: string;
  presence_sub?: boolean;
  simple_latest?: boolean;
};

  /*
   * `search.*`
   */
export type SearchAllArguments = TokenOverridable & {
  query: string;
  count?: number;
  page?: number;
  highlight?: boolean;
  sort: 'score' | 'timestamp';
  sort_dir: 'asc' | 'desc';
};
export type SearchFilesArguments = SearchAllArguments;
export type SearchMessagesArguments = SearchAllArguments;

  /*
   * `stars.*`
   */
export type StarsAddArguments = TokenOverridable & {
  // must supply one of:
  channel?: string; // paired with `timestamp`
  timestamp?: string; // paired with `channel`
  file?: string; // file id
  file_comment?: string;
};
export type StarsListArguments = TokenOverridable & {
  count?: number;
  page?: number;
};
export type StarsRemoveArguments = TokenOverridable & {
  // must supply one of:
  channel?: string; // paired with `timestamp`
  timestamp?: string; // paired with `channel`
  file?: string; // file id
  file_comment?: string;
};

  /*
   * `team.*`
   */
export type TeamAccessLogsArguments = TokenOverridable & {
  before?: number;
  count?: number;
  page?: number;
};
export type TeamBillableInfoArguments = TokenOverridable & {
  user?: string;
};
export type TeamInfoArguments = TokenOverridable;
export type TeamIntegrationLogsArguments = TokenOverridable & {
  app_id?: string;
  change_type?: string; // TODO: list types: 'x' | 'y' | 'z'
  count?: number;
  page?: number;
  service_id?: string;
  user?: string;
};
export type TeamProfileGetArguments = TokenOverridable & {
  visibility?: 'all' | 'visible' | 'hidden';
};

  /*
   * `usergroups.*`
   */
export type UsergroupsCreateArguments = TokenOverridable & {
  name: string;
  channels?: string; // comma-separated list of channels
  description?: string;
  handle?: string;
  include_count?: boolean;
};
export type UsergroupsDisableArguments = TokenOverridable & {
  usergroup: string;
  include_count?: boolean;
};
export type UsergroupsEnableArguments = TokenOverridable & {
  usergroup: string;
  include_count?: boolean;
};
export type UsergroupsListArguments = TokenOverridable & {
  include_count?: boolean;
  include_disabled?: boolean;
  include_users?: boolean;
};
export type UsergroupsUpdateArguments = TokenOverridable & {
  usergroup: string;
  channels?: string; // comma-separated list of channels
  description?: string;
  handle?: string;
  include_count?: boolean;
  name?: string;
};
export type UsergroupsUsersListArguments = TokenOverridable & {
  usergroup: string;
  include_disabled?: boolean;
};
export type UsergroupsUsersUpdateArguments = TokenOverridable & {
  usergroup: string;
  users: string; // comma-separated list of users
  include_count?: boolean;
};

  /*
   * `users.*`
   */
export type UsersDeletePhotoArguments = TokenOverridable;
export type UsersGetPresenceArguments = TokenOverridable & {
  user: string;
};
export type UsersIdentityArguments = TokenOverridable;
export type UsersInfoArguments = TokenOverridable & LocaleAware & {
  user: string;
};
export type UsersListArguments = TokenOverridable & CursorPaginationEnabled & LocaleAware & {
  presence?: boolean; // deprecated, defaults to false
};
export type UsersLookupByEmailArguments = TokenOverridable & {
  email: string;
};
export type UsersSetActiveArguments = TokenOverridable; // deprecated & being removed may 8, 2018
export type UsersSetPhotoArguments = TokenOverridable & {
  image: Buffer | Stream;
  crop_w?: number;
  crop_x?: number;
  crop_y?: number;
};
export type UsersSetPresenceArguments = TokenOverridable & {
  presence: 'auto' | 'away';
};
export type UsersProfileGetArguments = TokenOverridable & {
  include_labels?: boolean;
  user?: string;
};
export type UsersProfileSetArguments = TokenOverridable & {
  profile?: string; // url-encoded json
  user?: string;
  name?: string; // usable if `profile` is not passed
  value?: string; // usable if `profile` is not passed
};
