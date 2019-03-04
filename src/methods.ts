import { Stream } from 'stream';
import { WebAPICallOptions, WebAPIResultCallback, WebAPICallResult } from './WebClient';

// NOTE: could create a named type alias like data types like `SlackUserID: string`
// NOTE: not clear if these interfaces should be exported at the top-level

/**
 * Generic method definition
 */
export default interface Method<MethodArguments extends WebAPICallOptions> {
  // TODO: can we create a relationship between MethodArguments and a MethodResult type? hint: conditional types
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

export interface LocaleAware {
  include_locale?: boolean;
}

export interface Searchable {
  query: string;
  highlight?: boolean;
  sort: 'score' | 'timestamp';
  sort_dir: 'asc' | 'desc';
}

// For workspace apps, this argument allows calling a method on behalf of a user
export interface UserPerspectiveEnabled {
  on_behalf_of?: string;
}

// Pagination protocols
// --------------------
// In order to support automatic pagination in the WebClient, the following pagination types are not only defined as an
// interface to abstract the related arguments, but also all API methods which support the pagination type are added
// to a respective Set, so that the WebClient can reflect on which API methods it may apply automatic pagination.
// As maintainers, we must be careful to add each of the API methods into these sets, so that is handled local (in line
// numbers close) to the application of each interface.

// TODO: express the interfaces as keyof the sets?

export interface CursorPaginationEnabled {
  limit?: number; // natural integer, max of 1000
  cursor?: string; // find this in a response's `response_metadata.next_cursor`
}
export const cursorPaginationOptionKeys = new Set(['limit', 'cursor']);
export const cursorPaginationEnabledMethods: Map<string, string> = new Map(); // method : paginatedResponseProperty

export interface TimelinePaginationEnabled {
  oldest?: string;
  latest?: string;
  inclusive?: boolean;
}
export const timelinePaginationOptionKeys = new Set(['oldest', 'latest', 'inclusive']);
export const timelinePaginationEnabledMethods = new Set();

export interface TraditionalPagingEnabled {
  page?: number; // default: 1
  count?: number; // default: 100
}
export const traditionalPagingOptionKeys = new Set(['page', 'count']);
export const traditionalPagingEnabledMethods = new Set();

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
    data_source?: 'users' | 'channels' | 'conversations' | 'external';
    selected_options?: SelectOption[];
    options?: SelectOption[];
    option_groups?: {
      label: string;
      options: SelectOption[];
    }[];
    min_query_length?: number;
  }[];
  submit_label?: string;
  notify_on_cancel?: boolean;
  state?: string;
}

/*
 * Block Elements
 */

export interface ImageElement {
  type: 'image';
  image_url: string;
  alt_text: string;
}

export interface UserElement {
  type: 'user';
  user_id: string;
}

export interface PlainTextElement {
  type: 'plain_text';
  text: string;
  emoji?: boolean;
}

export interface MrkdwnElement {
  type: 'mrkdwn';
  text: string;
  verbatim?: boolean;
}

export interface Option {
  text: PlainTextElement;
  value?: string;
  url?: string;
  description?: PlainTextElement;
}

export interface Confirm {
  title?: PlainTextElement;
  text: PlainTextElement | MrkdwnElement;
  confirm?: PlainTextElement;
  deny?: PlainTextElement;
}

/*
 * Action Types
 */

type KnownAction = UsersSelect | StaticSelect | ConversationsSelect | ChannelsSelect | ExternalSelect |
  Button | Overflow | Datepicker;

interface Action {
  type: string;
  action_id?: string;
  confirm?: Confirm;
}

export interface UsersSelect extends Action {
  type: 'users_select';
  initial_user?: string;
  placeholder?: PlainTextElement;
}

export interface StaticSelect extends Action {
  type: 'static_select';
  placeholder?: PlainTextElement;
  initial_option?: Option;
  options?: Option[];
  option_groups?: {
    label: PlainTextElement;
    options: Option[];
  }[];
}

export interface ConversationsSelect extends Action {
  type: 'conversations_select';
  initial_conversation?: string;
  placeholder?: PlainTextElement;
}

export interface ChannelsSelect extends Action {
  type: 'channels_select';
  initial_channel?: string;
  placeholder?: PlainTextElement;
}

export interface ExternalSelect extends Action {
  type: 'external_select';
  initial_option?: Option;
  placeholder?: PlainTextElement;
  min_query_length?: number;
}

export interface Button extends Action {
  type: 'button';
  text: PlainTextElement;
  value?: string;
  url?: string;
}

export interface Overflow extends Action {
  type: 'overflow';
  options: Option[];
}

export interface Datepicker extends Action {
  type: 'datepicker';
  initial_date?: string;
  placeholder?: PlainTextElement;
}

/*
 * Block Types
 */

export type KnownBlock = ImageBlock | ContextBlock | ActionsBlock | DividerBlock | SectionBlock;

export interface Block {
  type: string;
  block_id?: string;
}

export interface ImageBlock extends Block {
  type: 'image';
  image_url: string;
  alt_text: string;
  title?: PlainTextElement;
}

export interface ContextBlock extends Block {
  type: 'context';
  elements: (ImageElement | UserElement | PlainTextElement | MrkdwnElement)[];
}

export interface ActionsBlock extends Block {
  type: 'actions';
  elements: (KnownAction | Action)[];
}

export interface DividerBlock extends Block {
  type: 'divider';
}

export interface SectionBlock extends Block {
  type: 'section';
  text?: PlainTextElement | MrkdwnElement; // either this or fields must be defined
  fields?: (PlainTextElement | MrkdwnElement)[]; // either this or text must be defined
  accessory?: KnownAction | Action | ImageElement;
}

export interface MessageAttachment {
  blocks?: (KnownBlock | Block)[];
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
  actions?: AttachmentAction[];
  callback_id?: string;
  mrkdwn_in?: ('pretext' | 'text' | 'fields')[];
}

export interface AttachmentAction {
  id?: string;
  confirm?: Confirmation;
  data_source?: 'static' | 'channels' | 'conversations' | 'users' | 'external';
  min_query_length?: number;
  name?: string;
  options?: OptionField[];
  option_groups?: {
    text: string
    options: OptionField[];
  }[];
  selected_options?: OptionField[];
  style?: 'default' | 'primary' | 'danger';
  text: string;
  type: 'button' | 'select';
  value?: string;
  url?: string;
}

export interface OptionField {
  description?: string;
  text: string;
  value: string;
}

export interface Confirmation {
  dismiss_text?: string;
  ok_text?: string;
  text: string;
  title?: string;
}

export interface LinkUnfurls {
  [linkUrl: string]: MessageAttachment;
}

export interface SelectOption {
  label: string; // shown to user
  value: string; // sent to app
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
export type AppsPermissionsResourcesListArguments = TokenOverridable & CursorPaginationEnabled;
cursorPaginationEnabledMethods.set('apps.permissions.resources.list', 'resources');
export type AppsPermissionsScopesListArguments = TokenOverridable & {};

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
timelinePaginationEnabledMethods.add('channels.history');
export type ChannelsInfoArguments = TokenOverridable & LocaleAware & {
  channel: string;
};
export type ChannelsInviteArguments = TokenOverridable & {
  channel: string;
  user: string;
};
export type ChannelsJoinArguments = TokenOverridable & {
  name: string;
  validate?: boolean;
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
cursorPaginationEnabledMethods.set('channels.list', 'channels');
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
  blocks?: (KnownBlock | Block)[];
  link_names?: boolean;
  parse?: 'full' | 'none';
};
export type ChatPostMessageArguments = TokenOverridable & {
  channel: string;
  text: string;
  as_user?: boolean;
  attachments?: MessageAttachment[];
  blocks?: (KnownBlock | Block)[];
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
  blocks?: (KnownBlock | Block)[];
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
cursorPaginationEnabledMethods.set('conversations.history', 'messages');
timelinePaginationEnabledMethods.add('conversations.history');
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
cursorPaginationEnabledMethods.set('conversations.list', 'channels');
export type ConversationsMembersArguments = TokenOverridable & CursorPaginationEnabled & {
  channel: string;
};
cursorPaginationEnabledMethods.set('conversations.members', 'members');
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
cursorPaginationEnabledMethods.set('conversations.replies', 'messages');
timelinePaginationEnabledMethods.add('conversations.replies');
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
export type DndEndDndArguments = TokenOverridable & UserPerspectiveEnabled;
export type DndEndSnoozeArguments = TokenOverridable & UserPerspectiveEnabled;
export type DndInfoArguments = TokenOverridable & {
  user: string;
};
export type DndSetSnoozeArguments = TokenOverridable & UserPerspectiveEnabled & {
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
export type FilesInfoArguments = TokenOverridable & CursorPaginationEnabled & {
  file: string; // file id
  count?: number;
  page?: number;
};
cursorPaginationEnabledMethods.set('files.info', 'comments');
export type FilesListArguments = TokenOverridable & TraditionalPagingEnabled & {
  channel?: string;
  user?: string;
  ts_from?: string;
  ts_to?: string;
  types?: string; // comma-separated list of file types
};
traditionalPagingEnabledMethods.add('files.list');
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
  thread_ts?: string; // if specified, `channels` must be set
};
export type FilesCommentsDeleteArguments = TokenOverridable & {
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
export type GroupsHistoryArguments = TokenOverridable & TimelinePaginationEnabled & {
  channel: string;
  unreads?: boolean;
  count?: number;
};
timelinePaginationEnabledMethods.add('groups.history');
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
export type GroupsListArguments = TokenOverridable & CursorPaginationEnabled & {
  exclude_archived?: boolean;
  exclude_members?: boolean;
};
cursorPaginationEnabledMethods.set('groups.list', 'groups');
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
timelinePaginationEnabledMethods.add('im.history');
export type IMListArguments = TokenOverridable & CursorPaginationEnabled;
cursorPaginationEnabledMethods.set('im.list', 'ims');
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
timelinePaginationEnabledMethods.add('mpim.history');
export type MPIMListArguments = TokenOverridable & CursorPaginationEnabled;
cursorPaginationEnabledMethods.set('mpim.list', 'groups');
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
  redirect_uri?: string;
  grant_type?: 'authorization_code' | 'refresh_token';
  code?: string; // only when grant_type = 'authorization_code'
  refresh_token?: string; // only when grant_type = 'refresh_token'
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
export type ReactionsListArguments = TokenOverridable & TraditionalPagingEnabled & CursorPaginationEnabled & {
  user?: string;
  full?: boolean;
};
cursorPaginationEnabledMethods.set('reactions.list', 'items');
traditionalPagingEnabledMethods.add('reactions.list');
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
export type RemindersAddArguments = TokenOverridable & UserPerspectiveEnabled & {
  text: string;
  time: string | number;
  user?: string;
};
export type RemindersCompleteArguments = TokenOverridable & UserPerspectiveEnabled & {
  reminder: string;
};
export type RemindersDeleteArguments = TokenOverridable & UserPerspectiveEnabled & {
  reminder: string;
};
export type RemindersInfoArguments = TokenOverridable & UserPerspectiveEnabled & {
  reminder: string;
};
export type RemindersListArguments = TokenOverridable & UserPerspectiveEnabled;

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
export type SearchAllArguments = TokenOverridable & TraditionalPagingEnabled & Searchable;
traditionalPagingEnabledMethods.add('search.all');
export type SearchFilesArguments = TokenOverridable & TraditionalPagingEnabled & Searchable;
traditionalPagingEnabledMethods.add('search.files');
export type SearchMessagesArguments = TokenOverridable & TraditionalPagingEnabled & Searchable;
traditionalPagingEnabledMethods.add('search.messages');

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
export type StarsListArguments = TokenOverridable & TraditionalPagingEnabled & CursorPaginationEnabled;
cursorPaginationEnabledMethods.set('stars.list', 'items');
traditionalPagingEnabledMethods.add('stars.list');
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
export type UsersConversationsArguments = TokenOverridable & CursorPaginationEnabled & {
  exclude_archived?: boolean;
  types?: string; // comma-separated list of conversation types
  user?: string;
};
cursorPaginationEnabledMethods.set('users.conversations', 'channels');
export type UsersDeletePhotoArguments = TokenOverridable;
export type UsersGetPresenceArguments = TokenOverridable & {
  user: string;
};
export type UsersIdentityArguments = TokenOverridable & UserPerspectiveEnabled;
export type UsersInfoArguments = TokenOverridable & LocaleAware & {
  user: string;
};
export type UsersListArguments = TokenOverridable & CursorPaginationEnabled & LocaleAware & {
  presence?: boolean; // deprecated, defaults to false
};
cursorPaginationEnabledMethods.set('users.list', 'members');
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
export type UsersProfileSetArguments = TokenOverridable & UserPerspectiveEnabled &{
  profile?: string; // url-encoded json
  user?: string;
  name?: string; // usable if `profile` is not passed
  value?: string; // usable if `profile` is not passed
};
