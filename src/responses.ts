export interface Im {
  is_org_shared: boolean;
  created: number;
  is_user_deleted: boolean;
  priority?: number;
  user: user_id;
  is_im: boolean;
  id: dm_id;
}

export interface User {
  profile: UserProfile;
  updated: number;
  tz: string;
  name: string;
  deleted: boolean;
  is_app_user: boolean;
  is_bot: boolean;
  tz_label: string;
  real_name: string;
  locale?: string;
  team_id: team;
  is_admin: boolean;
  is_ultra_restricted: boolean;
  is_owner: boolean;
  is_restricted: boolean;
  tz_offset: number;
  has_2fa?: boolean;
  id: user_id;
  color: string;
  is_primary_owner: boolean;
}

export type comment_id = string;
export type bot_id = string;
export interface Paging {
  count: number;
  total: number;
  page: number;
  pages?: number;
}

export type team = string;
export interface FileObjectWithIdOnly {
  [key: string]: any;
}

export type ts = string;
export interface File {
  thumb_480_w?: number;
  reactions?: Reaction[];
  image_exif_rotation?: number;
  filetype?: string;
  thumb_800_h?: number;
  thumb_480?: string;
  display_as_bot?: boolean;
  thumb_800_w?: number;
  thumb_64?: string;
  size?: number;
  original_h?: number;
  thumb_360_w?: number;
  title?: string;
  url_private?: string;
  thumb_720_h?: number;
  thumb_360?: string;
  id?: file_id;
  ims?: any[];
  thumb_720_w?: number;
  thumb_80?: string;
  comments_count?: number;
  thumb_360_h?: number;
  thumb_480_h?: number;
  original_w?: number;
  username?: string;
  thumb_800?: string;
  timestamp?: number;
  public_url_shared?: boolean;
  editable?: boolean;
  thumb_160?: string;
  external_type?: string;
  url_private_download?: string;
  thumb_1024?: string;
  user?: string;
  groups?: any[];
  thumb_960?: string;
  is_public?: boolean;
  pretty_type?: string;
  name?: string;
  mimetype?: string;
  permalink_public?: string;
  permalink?: string;
  is_external?: boolean;
  created?: number;
  thumb_1024_h?: number;
  thumb_960_h?: number;
  pinned_to?: channel[];
  thumb_960_w?: number;
  thumb_1024_w?: number;
  mode?: string;
  thumb_720?: string;
  channels?: channel_id[];
}

export interface UserProfile {
  last_name?: string;
  status_emoji?: string;
  display_name_normalized: string;
  email?: string;
  image_32: string;
  skype?: string;
  image_72: string;
  status_expiration?: number;
  image_192: string;
  first_name?: string;
  display_name: string;
  title?: string;
  real_name_normalized: string;
  always_active?: boolean;
  status_text_canonical?: string;
  image_24: string;
  phone?: string;
  image_48: string;
  guest_channels?: string;
  image_original?: string;
  fields?: any;
  real_name: string;
  image_512?: string;
  team?: team;
  avatar_hash: string;
  status_text?: string;
}

export type room_id = string;
export type channel_id = string;
export type channel_name = string;
export interface TeamProfileField {
  hint: string;
  ordering: number;
  type: 'text' | 'date' | 'link' | 'mailto' | 'options_list' | 'user';
  possible_values?: string[];
  label: string;
  id: string;
  is_hidden?: boolean;
  field_name?: string;
  options: string[];
}

export type dm_id = string;
export type channel = string;
export interface Comment {
  comment?: string;
  reactions?: Reaction[];
  created?: number;
  timestamp?: number;
  pinned_to?: channel[];
  is_intro?: boolean;
  user?: string;
  id?: comment_id;
}

export interface Channel {
  is_general?: boolean;
  name_normalized: string;
  last_read?: ts;
  creator: user_id;
  is_member?: boolean;
  is_archived?: boolean;
  topic: {
    last_set: number;
    value: string;
    creator: topic_purpose_creator;
  };
  unread_count_display?: number;
  id: channel_id;
  is_org_shared: boolean;
  is_channel: boolean;
  name: string;
  priority?: number;
  is_moved?: number;
  accepted_user?: user_id;
  is_pending_ext_shared?: boolean;
  is_mpim: boolean;
  is_read_only?: boolean;
  purpose: {
    last_set: number;
    value: string;
    creator: topic_purpose_creator;
  };
  members: user_id[];
  is_private: boolean;
  previous_names?: channel_name[];
  num_members?: number;
  is_shared: boolean;
  created: number;
  pending_shared?: team[];
  unread_count?: number;
  unlinked?: number;
  latest?: null | Message;
}

export type topic_purpose_creator = string;
export type invite_id = number;
export type file_id = string;
export type group_id = string;
export type user_id = string;
export interface Group {
  is_pending_ext_shared?: boolean;
  name_normalized: string;
  name: string;
  last_read?: ts;
  creator: user_id;
  is_moved?: number;
  is_mpim?: boolean;
  is_archived?: boolean;
  created: number;
  is_group: boolean;
  topic: {
    last_set: number;
    value: string;
    creator: topic_purpose_creator;
  };
  unread_count?: number;
  is_open?: boolean;
  purpose: {
    last_set: number;
    value: string;
    creator: topic_purpose_creator;
  };
  members: user_id[];
  priority?: number;
  latest?: null | Message;
  id: group_id;
  unread_count_display?: number;
}

export interface Reaction {
  count: number;
  name: string;
  users: user_id[];
}

export type ok_false = false;
export interface InvitingUser {
  profile: UserProfileShortest;
  updated: number;
  name: string;
  is_app_user: boolean;
  real_name?: string;
  team_id: team;
  is_ultra_restricted: boolean;
  is_restricted: boolean;
  id: user_id;
}

export interface UserProfileShort {
  first_name: string;
  display_name: string;
  name: string;
  team: team;
  real_name: string;
  avatar_hash: string;
  is_ultra_restricted: boolean;
  is_restricted: boolean;
  image_72: string;
}

export interface Comments {
  [key: string]: any;
}

export type ok_true = true;
export interface Conversation {
  [key: string]: any;
}

export interface Team {
  domain: string;
  name: string;
  enterprise_name?: string;
  id: team;
  email_domain: string;
  has_compliance_export?: boolean;
  enterprise_id?: string;
  icon: {
    image_230?: string;
    image_132?: string;
    image_68?: string;
    image_34?: string;
    image_102?: string;
    image_default?: boolean;
    image_44?: string;
    image_88?: string;
  };
}

export interface UserProfileShortest {
  first_name: string;
  display_name: string;
  team: team;
  real_name: string;
  avatar_hash: string;
  image_72: string;
}

export interface Message {
  comment?: Comment;
  reactions?: Reaction[];
  attachments?: {
    image_bytes?: number;
    image_width?: number;
    image_height?: number;
    image_url?: string;
    fallback?: string;
    id: number;
  }[];
  last_read?: ts;
  text: string;
  topic?: string;
  display_as_bot?: boolean;
  reply_count?: number;
  file?: File;
  replies?: {
    ts: ts;
    user: user_id;
  }[];
  user_team?: team;
  subscribed?: boolean;
  icons?: {
    emoji?: string;
  };
  purpose?: string;
  ts: ts;
  subtype?: string;
  type: string;
  username?: string;
  source_team?: team;
  user_profile?: UserProfileShort;
  user?: user_id;
  old_name?: string;
  thread_ts?: ts;
  permalink?: string;
  name?: string;
  upload?: boolean;
  pinned_to?: channel[];
  unread_count?: number;
  is_intro?: boolean;
  team?: team;
  inviter?: user_id;
  bot_id?: null | bot_id;
}

// POST: /chat.delete
export type ChatDeleteResponse = {
  ok: ok_true;
  ts: ts;
  channel: channel;
} & {
  [key: string]: any;
};
// POST: /files.comments.edit
export type FilesCommentsEditResponse = {
  ok: ok_false;
  error:
  | 'cant_edit'
  | 'comment_not_found'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'no_permission'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  comment: Comment;
  ok: ok_true;
};
// POST: /mpim.open
export type MPIMOpenResponse = {
  ok: ok_false;
  error:
  | 'users_list_not_supplied'
  | 'not_enough_users'
  | 'too_many_users'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'no_permission'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'team_added_to_org'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  ok: ok_true;
  group: Group;
};
// GET: /groups.replies
export type GroupsRepliesResponse = {
  ok: ok_true;
};
// GET: /bots.info
export type BotsInfoResponse = {
  ok: ok_true;
};
// POST: /reminders.add
export type RemindersAddResponse = {
  ok: ok_true;
};
// POST: /groups.rename
export type GroupsRenameResponse = {
  ok: ok_true;
};
// POST: /users.profile.set
export type UsersProfileSetResponse = {
  ok: ok_true;
};
// POST: /users.setPresence
export type UsersSetPresenceResponse = {
  ok: ok_true;
};
// POST: /conversations.close
export type ConversationsCloseResponse = {
  no_op?: boolean;
  ok: ok_true;
  already_closed?: boolean;
} & {
  needed?: string;
  error:
    | 'method_not_supported_for_channel_type'
    | 'channel_not_found'
    | 'user_does_not_own_channel'
    | 'missing_scope'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'team_added_to_org'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required';
  ok: ok_false;
  provided?: string;
};
// POST: /im.open
export type IMOpenResponse = {
  ok: ok_false;
  error:
  | 'user_not_found'
  | 'user_not_visible'
  | 'user_disabled'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'no_permission'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'team_added_to_org'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} &
  {
    no_op?: boolean;
    already_open?: boolean;
    ok: ok_true;
    channel: {
      last_read?: ts;
      created?: string;
      unread_count?: number;
      is_open?: boolean;
      user?: user_id;
      unread_count_display?: number;
      is_im?: boolean;
      id: dm_id;
      latest?: Message;
    }
  };
// GET: /groups.list
export type GroupsListResponse = {
  ok: ok_false;
  error:
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  ok: ok_true;
  groups: Group[];
};
// GET: /team.integrationLogs
export type TeamIntegrationLogsResponse = {
  ok: ok_true;
};
// POST: /groups.kick
export type GroupsKickResponse = {
  ok: ok_true;
};
// GET: /dnd.info
export type DndInfoResponse = {
  ok: ok_true;
};
// POST: /channels.archive
export type ChannelsArchiveResponse = {
  ok: ok_false;
  error:
  | 'channel_not_found'
  | 'already_archived'
  | 'cant_archive_general'
  | 'restricted_action'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'user_is_bot'
  | 'user_is_restricted'
  | 'user_is_ultra_restricted'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required'
  | 'team_added_to_org'
  | 'missing_charset'
  | 'superfluous_charset';
} & {
  ok: ok_true;
};
// GET: /reminders.info
export type RemindersInfoResponse = {
  ok: ok_true;
};
// GET: /channels.info
export type ChannelsInfoResponse = {
  ok: ok_false;
  error:
  | 'channel_not_found'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required'
  | 'team_added_to_org'
  | 'missing_charset'
  | 'superfluous_charset';
} & {
  ok: ok_true;
  channel: Channel;
};
// POST: /channels.kick
export type ChannelsKickResponse = {
  ok: ok_true;
};
// POST: /groups.mark
export type GroupsMarkResponse = {
  ok: ok_true;
} & {
  ok: ok_false;
  error:
    | 'channel_not_found'
    | 'invalid_timestamp'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required';
};
// POST: /mpim.close
export type MPIMCloseResponse = {
  ok: ok_true;
};
// GET: /users.profile.get
export type UsersProfileGetResponse = {
  ok: ok_true;
};
// GET: /channels.history
export type ChannelsHistoryResponse = {
  has_more: boolean;
  ok: ok_true;
  messages: Message[];
} & {
  ok: ok_false;
  error:
    | 'channel_not_found'
    | 'invalid_ts_latest'
    | 'invalid_ts_oldest'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required';
};
// POST: /im.mark
export type IMMarkResponse = {
  ok: ok_false;
  error:
  | 'channel_not_found'
  | 'invalid_timestamp'
  | 'not_in_channel'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  ok: ok_true;
};
// GET: /oauth.token
export type OAuthTokenResponse = {
  ok: ok_true;
};
// POST: /files.upload
export type FilesUploadResponse = {
  ok: ok_false;
  error:
  | 'posting_to_general_channel_denied'
  | 'invalid_channel'
  | 'file_uploads_disabled'
  | 'file_uploads_except_images_disabled'
  | 'storage_limit_reached'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'no_permission'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'team_added_to_org'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  ok: ok_true;
  file: File;
};
// GET: /usergroups.users.list
export type UsergroupsUsersListResponse = {
  ok: ok_true;
};
// GET: /users.info
export type UsersInfoResponse = {
  ok: ok_true;
  user: User;
} & {
  ok: ok_false;
  error:
    | 'user_not_found'
    | 'user_not_visible'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'team_added_to_org'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required';
};
// GET: /users.lookupByEmail
export type UsersLookupByEmailResponse = {
  ok: ok_false;
  error:
  | 'users_not_found'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'no_permission'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'team_added_to_org'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required'
  | 'fatal_error';
} & {
  ok: ok_true;
  user: User;
};
// GET: /reactions.list
export type ReactionsListResponse = {
  items: {
    comment: Comment;
    type: 'file_comment';
    file: File;
  }[]
  | {
    message: Message;
    type: 'message';
    channel: channel;
  }[]
  | {
    type: 'file';
    file: File;
  }[];

  paging?: Paging;
  ok: ok_true;
} & {
  ok: ok_false;
  error:
    | 'user_not_found'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactiv'
    | 'no_permission'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'team_added_to_org'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required'
    | 'fatal_error';
};
// POST: /conversations.create
export type ConversationsCreateResponse = {
  provided?: string;
  error:
  | 'method_not_supported_for_channel_type'
  | 'missing_scope'
  | 'name_taken'
  | 'restricted_action'
  | 'no_channel'
  | 'invalid_name_required'
  | 'invalid_name_punctuation'
  | 'invalid_name_maxlength'
  | 'invalid_name_specials'
  | 'invalid_name'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'user_is_bot'
  | 'user_is_restricted'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'team_added_to_org'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
  ok: ok_false;
  detail?: string;
  needed?: string;
} & {
  ok: ok_true;
  channel: Conversation;
};
// GET: /team.billableInfo
export type TeamBillableInfoResponse = {
  ok: ok_true;
};
// POST: /dnd.endDnd
export type DndEndDndResponse = {
  ok: ok_true;
};
// GET: /search.all
export type SearchAllResponse = {
  ok: ok_true;
};
// POST: /files.comments.delete
export type FilesCommentsDeleteResponse = {
  ok: ok_false;
  error:
  | 'cant_delete'
  | 'comment_not_found'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'no_permission'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  ok: ok_true;
};
// GET: /auth.revoke
export type AuthRevokeResponse = {
  ok: ok_true;
};
// POST: /reactions.add
export type ReactionsAddResponse = {
  ok: ok_false;
  error:
  | 'bad_timestamp'
  | 'file_not_found'
  | 'file_comment_not_found'
  | 'message_not_found'
  | 'no_item_specified'
  | 'invalid_name'
  | 'already_reacted'
  | 'too_many_emoji'
  | 'too_many_reactions'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'no_permission'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'team_added_to_org'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  ok: ok_true;
};
// POST: /stars.add
export type StarsAddResponse = {
  ok: ok_true;
};
// POST: /reminders.complete
export type RemindersCompleteResponse = {
  ok: ok_true;
};
// POST: /chat.unfurl
export type ChatUnfurlResponse = {
  [key: string]: any;
} & {
  ok: ok_true;
};
// POST: /conversations.unarchive
export type ConversationsUnarchiveResponse = {
  ok: ok_true;
} & {
  needed?: string;
  error:
    | 'method_not_supported_for_channel_type'
    | 'missing_scope'
    | 'channel_not_found'
    | 'not_archived'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'user_is_bot'
    | 'user_is_restricted'
    | 'user_is_ultra_restricted'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required'
    | 'team_added_to_org'
    | 'missing_charset'
    | 'superfluous_charset';
  ok: ok_false;
  provided?: string;
};
// GET: /groups.info
export type GroupsInfoResponse = {
  ok: ok_false;
  error:
  | 'channel_not_found'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'team_added_to_org'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  ok: ok_true;
  group: Group;
};
// POST: /files.revokePublicURL
export type FilesRevokePublicURLResponse = {
  ok: ok_true;
};
// GET: /conversations.list
export type ConversationsListResponse = {
  needed?: string;
  error:
  | 'missing_scope'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
  ok: ok_false;
  provided?: string;
} &
  {
    channels: Conversation[];
    ok: ok_true;
    response_metadata?: {
      next_cursor: string;
    };
  };
// GET: /stars.list
export type StarsListResponse = {
  ok: ok_true;
};
// GET: /reactions.get
export type ReactionsGetResponse = {
  ok: ok_false;
  error:
  | 'bad_timestamp'
  | 'file_not_found'
  | 'file_comment_not_found'
  | 'message_not_found'
  | 'no_item_specified'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'no_permission'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'team_added_to_org'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  [key: string]: any;
};
// GET: /im.history
export type IMHistoryResponse = {
  needed?: string;
  error:
  | 'channel_not_found'
  | 'invalid_ts_latest'
  | 'invalid_ts_oldest'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
  ok: ok_false;
  provided?: string;
} & {
  has_more: boolean;
  ok: ok_true;
  messages: Message[];
};
// POST: /pins.add
export type PinsAddResponse = {
  ok: ok_false;
  error:
  | 'bad_timestamp'
  | 'file_not_found'
  | 'file_comment_not_found'
  | 'message_not_found'
  | 'channel_not_found'
  | 'no_item_specified'
  | 'already_pinned'
  | 'permission_denied'
  | 'file_not_shared'
  | 'not_pinnable'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'no_permission'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'team_added_to_org'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  ok: ok_true;
};
// POST: /channels.leave
export type ChannelsLeaveResponse = {
  ok: ok_true;
};
// GET: /chat.getPermalink
export type ChatGetPermalinkResponse = {
  permalink: string;
  ok: ok_true;
  channel: channel;
} & {
  [key: string]: any;
};
// POST: /channels.rename
export type ChannelsRenameResponse = {
  ok: ok_true;
};
// GET: /files.list
export type FilesListResponse = {
  files: File[];
  paging: Paging;
  ok: ok_true;
} & {
  ok: ok_false;
  error:
    | 'user_not_found'
    | 'unknown_type'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'no_permission'
    | 'user_is_bot'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'team_added_to_org'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required';
};
// POST: /mpim.mark
export type MPIMMarkResponse = {
  ok: ok_true;
};
// POST: /usergroups.users.update
export type UsergroupsUsersUpdateResponse = {
  ok: ok_true;
};
// POST: /conversations.setTopic
export type ConversationsSetTopicResponse = {
  ok: ok_true;
  channel: Conversation;
} & {
  needed?: string;
  error:
    | 'method_not_supported_for_channel_type'
    | 'missing_scope'
    | 'channel_not_found'
    | 'not_in_channel'
    | 'is_archived'
    | 'too_long'
    | 'user_is_restricted'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'team_added_to_org'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required';
  ok: ok_false;
  provided?: string;
};
// GET: /conversations.members
export type ConversationsMembersResponse = {
  ok: ok_true;
  members: user_id[];
  response_metadata: {
    next_cursor: string;
  };
} & {
  ok: ok_false;
  error:
    | 'channel_not_found'
    | 'invalid_limit'
    | 'invalid_cursor'
    | 'fetch_members_failed'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'team_added_to_org'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required';
};
// POST: /conversations.open
export type ConversationsOpenResponse = {
  no_op?: boolean;
  already_open?: boolean;
  ok: ok_true;
  channel: Conversation;
} & {
  ok: ok_false;
  error:
    | 'method_not_supported_for_channel_type'
    | 'user_not_found'
    | 'user_not_visible'
    | 'user_disabled'
    | 'users_list_not_supplied'
    | 'not_enough_users'
    | 'too_many_users'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'team_added_to_org'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required'
    | 'channel_not_found';
};
// POST: /pins.remove
export type PinsRemoveResponse = {
  ok: ok_true;
} & {
  ok: ok_false;
  error:
    | 'bad_timestamp'
    | 'file_not_found'
    | 'file_comment_not_found'
    | 'message_not_found'
    | 'no_item_specified'
    | 'not_pinned'
    | 'permission_denied'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'no_permission'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_typ'
    | 'missing_post_typ'
    | 'team_added_to_org'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeou'
    | 'upgrade_required';
};
// POST: /files.delete
export type FilesDeleteResponse = {
  ok: ok_false;
  error:
  | 'file_not_found'
  | 'file_deleted'
  | 'cant_delete_file'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'no_permission'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'team_added_to_org'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  ok: ok_true;
};
// GET: /pins.list
export type PinsListResponse = {
  ok: ok_false;
  error:
  | 'channel_not_found'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'no_permission'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'team_added_to_org'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  [key: string]: any;
};
// GET: /api.test
export type APITestResponse = {
  ok: ok_false;
  error: string;
} & {
  ok: ok_true;
};
// GET: /reminders.list
export type RemindersListResponse = {
  ok: ok_true;
};
// GET: /users.getPresence
export type UsersGetPresenceResponse = {
  ok: ok_false;
  error: string;
} & {
  manual_away?: boolean;
  presence: string;
  last_activity?: number;
  online?: boolean;
  ok: ok_true;
  connection_count?: number;
  auto_away?: boolean;
};
// POST: /usergroups.update
export type UsergroupsUpdateResponse = {
  ok: ok_true;
};
// POST: /conversations.leave
export type ConversationsLeaveResponse = {
  needed?: string;
  error:
  | 'method_not_supported_for_channel_type'
  | 'last_member'
  | 'missing_scope'
  | 'channel_not_found'
  | 'is_archived'
  | 'cant_leave_general'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'user_is_bot'
  | 'user_is_restricted'
  | 'user_is_ultra_restricted'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required'
  | 'team_added_to_org'
  | 'missing_charset'
  | 'superfluous_charset';
  ok: ok_false;
  provided?: string;
} & {
  ok: ok_true;
  not_in_channel?: true;
};
// GET: /files.info
export type FilesInfoResponse = {
  ok: ok_false;
  error:
  | 'file_not_found'
  | 'file_deleted'
  | 'timezone_count_failed'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'no_permission'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'team_added_to_org'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  paging: Paging;
  ok: ok_true;
  file: File;
  comments: Comments;
};
// POST: /groups.leave
export type GroupsLeaveResponse = {
  ok: ok_true;
};
// GET: /apps.permissions.info
export type AppsPermissionsInfoResponse = {
  ok: ok_true;
};
// POST: /usergroups.create
export type UsergroupsCreateResponse = {
  ok: ok_true;
};
// POST: /groups.createChild
export type GroupsCreateChildResponse = {
  ok: ok_true;
};
// POST: /channels.mark
export type ChannelsMarkResponse = {
  ok: ok_false;
  error:
  | 'channel_not_found'
  | 'invalid_timestamp'
  | 'not_in_channel'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  ok: ok_true;
};
// POST: /users.deletePhoto
export type UsersDeletePhotoResponse = {
  ok: ok_true;
};
// POST: /users.setPhoto
export type UsersSetPhotoResponse = {
  ok: ok_true;
};
// POST: /files.sharedPublicURL
export type FilesSharedPublicURLResponse = {
  ok: ok_true;
};
// POST: /conversations.kick
export type ConversationsKickResponse = {
  ok: ok_true;
} & {
  needed?: string;
  error:
    | 'method_not_supported_for_channel_type'
    | 'missing_scope'
    | 'channel_not_found'
    | 'user_not_found'
    | 'cant_kick_self'
    | 'not_in_channel'
    | 'cant_kick_from_general'
    | 'restricted_action'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'user_is_bot'
    | 'user_is_restricted'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required';
  ok: ok_false;
  provided?: string;
};
// POST: /chat.postEphemeral
export type ChatPostEphemeralResponse = {
  ok: ok_true;
  message_ts: ts;
} & {
  [key: string]: any;
};
// POST: /conversations.rename
export type ConversationsRenameResponse = {
  needed?: string;
  error:
  | 'user_is_restricted'
  | 'method_not_supported_for_channel_type'
  | 'missing_scope'
  | 'channel_not_found'
  | 'not_in_channel'
  | 'not_authorized'
  | 'invalid_name'
  | 'name_taken'
  | 'invalid_name_required'
  | 'invalid_name_punctuation'
  | 'invalid_name_maxlength'
  | 'invalid_name_specials'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
  ok: ok_false;
  provided?: string;
} & {
  ok: ok_true;
  channel: Conversation;
};
// GET: /migration.exchange
export type MigrationExchangeResponse = {
  [key: string]: any;
}
  & {
    team_id: string;
    ok: ok_true;
    enterprise_id: string;
    invalid_user_ids?: string[];
    user_id_map?: {
      [k: string]: any;
    };
  };
// POST: /usergroups.enable
export type UsergroupsEnableResponse = {
  ok: ok_true;
};
// POST: /dnd.setSnooze
export type DndSetSnoozeResponse = {
  ok: ok_true;
};
// POST: /chat.update
export type ChatUpdateResponse = {
  text: string;
  ok: ok_true;
  ts: ts;
  channel: channel;
} & {
  ok: ok_false;
  error:
    | 'message_not_found'
    | 'cant_update_message'
    | 'channel_not_found'
    | 'edit_window_closed'
    | 'msg_too_long'
    | 'too_many_attachments'
    | 'rate_limited'
    | 'no_text'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'token_revoked'
    | 'no_permission'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'request_timeout'
    | 'invalid_json'
    | 'json_not_object'
    | 'upgrade_required'
    | 'fatal_error';
};
// GET: /mpim.history
export type MPIMHistoryResponse = {
  ok: ok_true;
};
// GET: /apps.permissions.request
export type AppsPermissionsRequestResponse = {
  ok: ok_true;
};
// POST: /channels.setPurpose
export type ChannelsSetPurposeResponse = {
  ok: ok_true;
};
// GET: /users.identity
export type UsersIdentityResponse = {
  ok: ok_true;
};
// GET: /team.accessLogs
export type TeamAccessLogsResponse = {
  ok: ok_true;
};
// POST: /groups.invite
export type GroupsInviteResponse = {
  ok: ok_true;
  group: Group;
} & {
  ok: ok_false;
  error:
    | 'channel_not_found'
    | 'user_not_found'
    | 'cant_invite_self'
    | 'is_archived'
    | 'cant_invite'
    | 'ura_max_channels'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'user_is_bot'
    | 'user_is_ultra_restricted'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'team_added_to_org'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required';
};
// POST: /channels.unarchive
export type ChannelsUnarchiveResponse = {
  ok: ok_true;
};
// GET: /rtm.connect
export type RTMConnectResponse = {
  ok: ok_true;
};
// GET: /team.info
export type TeamInfoResponse = {
  ok: ok_false;
  error:
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'token_revokedno_permission'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'team_added_to_org'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required'
  | 'fatal_error';
} & {
  ok: ok_true;
  team: Team;
};
// GET: /conversations.history
export type ConversationsHistoryResponse = {
  has_more: boolean;
  ok: ok_true;
  messages: Message[];
  pin_count: number;
} & {
  needed?: string;
  error:
    | 'missing_scope'
    | 'channel_not_found'
    | 'invalid_ts_latest'
    | 'invalid_ts_oldest'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required';
  ok: ok_false;
  provided?: string;
};
// POST: /channels.create
export type ChannelsCreateResponse = {
  ok: ok_true;
  channel: Channel;
} & {
  ok: ok_false;
  error:
    | 'name_taken'
    | 'restricted_action'
    | 'no_channel'
    | 'invalid_name_required'
    | 'invalid_name_punctuation'
    | 'invalid_name_maxlength'
    | 'invalid_name_specials'
    | 'invalid_name'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'user_is_bot'
    | 'user_is_restricted'
    | 'user_is_ultra_restricted'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required'
    | 'team_added_to_org'
    | 'missing_charset'
    | 'superfluous_charset';
};
// GET: /im.replies
export type IMRepliesResponse = {
  ok: ok_true;
};
// POST: /groups.create
export type GroupsCreateResponse = {
  ok: ok_true;
  group: Group;
} & {
  ok: ok_false;
  error:
    | 'no_channel'
    | 'restricted_action'
    | 'name_taken'
    | 'invalid_name_required'
    | 'invalid_name_punctuation'
    | 'invalid_name_maxlength'
    | 'invalid_name_specials'
    | 'invalid_name'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'user_is_bot'
    | 'user_is_ultra_restricted'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'team_added_to_org'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required';
};
// GET: /users.conversations
export type UsersConversationsResponse = {
  channels: Conversation[];
  ok: ok_true;
} & {
  [key: string]: any;
};
// POST: /conversations.setPurpose
export type ConversationsSetPurposeResponse = {
  ok: ok_true;
  channel: Conversation;
} & {
  needed?: string;
  error:
    | 'method_not_supported_for_channel_type'
    | 'missing_scope'
    | 'channel_not_found'
    | 'not_in_channel'
    | 'is_archived'
    | 'too_long'
    | 'user_is_restricted'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'team_added_to_org'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required';
  ok: ok_false;
  provided?: string;
};
// POST: /channels.join
export type ChannelsJoinResponse = {
  ok: ok_true;
};
// GET: /usergroups.list
export type UsergroupsListResponse = {
  ok: ok_true;
};
// POST: /conversations.join
export type ConversationsJoinResponse = {
  needed?: string;
  error:
  | 'method_not_supported_for_channel_type'
  | 'missing_scope'
  | 'channel_not_found'
  | 'is_archived'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'user_is_bot'
  | 'user_is_restricted'
  | 'user_is_ultra_restricted'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required'
  | 'team_added_to_org'
  | 'missing_charset'
  | 'superfluous_charset';
  ok: ok_false;
  provided?: string;
}
  & {
    warning?: string;
    ok: ok_true;
    channel: Conversation;
    response_metadata?: {
      warnings?: string[];
    };
  };
// POST: /groups.open
export type GroupsOpenResponse = {
  ok: ok_true;
};
// GET: /emoji.list
export type EmojiListResponse = {
  ok: ok_true;
};
// GET: /conversations.info
export type ConversationsInfoResponse = {
  ok: ok_true;
  channel: Conversation;
} & {
  needed?: string;
  error:
    | 'missing_scope'
    | 'channel_not_found'
    | 'team_added_to_org'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required';
  ok: ok_false;
  provided?: string;
};
// POST: /chat.meMessage
export type ChatMeMessageResponse = {
  ok: ok_true;
};
// POST: /dnd.endSnooze
export type DndEndSnoozeResponse = {
  ok: ok_true;
};
// GET: /groups.history
export type GroupsHistoryResponse = {
  has_more: boolean;
  ok: ok_true;
  messages: Message[];
} & {
  ok: ok_false;
  error:
    | 'channel_not_found'
    | 'invalid_ts_latest'
    | 'invalid_ts_oldest'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'team_added_to_org'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required';
};
// GET: /search.messages
export type SearchMessagesResponse = {
  ok: ok_true;
};
// GET: /RTM.start
export type RTMStartResponse = {
  ok: ok_true;
};
// POST: /channels.setTopic
export type ChannelsSetTopicResponse = {
  ok: ok_true;
};
// POST: /groups.setTopic
export type GroupsSetTopicResponse = {
  ok: ok_true;
};
// POST: /im.close
export type IMCloseResponse = {
  ok: ok_true;
};
// POST: /reactions.remove
export type ReactionsRemoveResponse = {
  ok: ok_false;
  error:
  | 'bad_timestamp'
  | 'file_not_found'
  | 'file_comment_not_found'
  | 'message_not_found'
  | 'no_item_specified'
  | 'invalid_name'
  | 'no_reaction'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'no_permission'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'team_added_to_org'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required'
  | 'fatal_error';
} & {
  ok: ok_true;
};
// POST: /reminders.delete
export type RemindersDeleteResponse = {
  ok: ok_true;
};
// POST: /usergroups.disable
export type UsergroupsDisableResponse = {
  ok: ok_true;
};
// POST: /files.comments.add
export type FilesCommentsAddResponse = {
  ok: ok_false;
  error:
  | 'file_not_found'
  | 'file_deleted'
  | 'no_comment'
  | 'cant_add'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'no_permission'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  comment: Comment;
  ok: ok_true;
};
// GET: /im.list
export type IMListResponse = {
  ims: Im[];
  ok: ok_true;
} & {
  ok: ok_false;
  error:
    | 'invalid_cursor'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'no_permission'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'team_added_to_org'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required';
};
// GET: /search.files
export type SearchFilesResponse = {
  ok: ok_true;
};
// GET: /mpim.replies
export type MPIMRepliesResponse = {
  ok: ok_true;
};
// GET: /dialog.open
export type DialogOpenResponse = {
  ok: ok_true;
};
// GET: /dnd.teamInfo
export type DndTeamInfoResponse = {
  cached?: boolean;
  ok: ok_true;
  users: {
    [k: string]: any;
  };
} & {
  needed?: string;
  error:
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'team_added_to_org'
    | 'request_timeout'
    | 'upgrade_required';
  ok: ok_false;
  provided?: string;
};
// GET: /users.list
export type UsersListResponse = {
  cache_ts: number;
  ok: ok_true;
  members: User[];
} & {
  ok: ok_false;
  error:
    | 'invalid_cursor'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'no_permission'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'team_added_to_org'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required'
    | 'fatal_error';
};
// POST: /conversations.invite
export type ConversationsInviteResponse = {
  provided?: string;
  errors?: {
    ok: ok_false;
    user?: user_id;
    error:
    | 'method_not_supported_for_channel_type'
    | 'missing_scope'
    | 'channel_not_found'
    | 'user_not_found'
    | 'cant_invite_self'
    | 'not_in_channel'
    | 'already_in_channel'
    | 'is_archived'
    | 'cant_invite'
    | 'too_many_users'
    | 'ura_max_channels'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'user_is_bot'
    | 'user_is_restricted'
    | 'user_is_ultra_restricted'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required'
    | 'team_added_to_org'
    | 'missing_charset'
    | 'superfluous_charset';
  }[]
  ok: ok_false;
  error?:
  | 'method_not_supported_for_channel_type'
  | 'missing_scope'
  | 'channel_not_found'
  | 'user_not_found'
  | 'cant_invite_self'
  | 'not_in_channel'
  | 'already_in_channel'
  | 'is_archived'
  | 'cant_invite'
  | 'too_many_users'
  | 'ura_max_channels'
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'user_is_bot'
  | 'user_is_restricted'
  | 'user_is_ultra_restricted'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required'
  | 'team_added_to_org'
  | 'missing_charset'
  | 'superfluous_charset';
  needed?: string;
} & {
  ok: ok_true;
  channel: Conversation;
};
// GET: /auth.test
export type AuthTestResponse = {
  ok: ok_false;
  error:
  | 'not_authed'
  | 'invalid_auth'
  | 'token_revoked'
  | 'account_inactive'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  ok: ok_true;
  url: string;
  team_id: team;
  user: string;
  team: string;
  user_id: user_id;
};
// GET: /channels.list
export type ChannelsListResponse = {
  ok: ok_false;
  error:
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_type'
  | 'missing_post_type'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeout'
  | 'upgrade_required';
} & {
  channels: Channel[];
  ok: ok_true;
};
// POST: /groups.setPurpose
export type GroupsSetPurposeResponse = {
  ok: ok_true;
};
// POST: /channels.invite
export type ChannelsInviteResponse = {
  ok: ok_true;
  channel: Channel;
} & {
  ok: ok_false;
  error:
    | 'channel_not_found'
    | 'user_not_found'
    | 'cant_invite_self'
    | 'not_in_channel'
    | 'already_in_channel'
    | 'is_archived'
    | 'cant_invite'
    | 'too_many_users'
    | 'ura_max_channels'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'user_is_bot'
    | 'user_is_restricted'
    | 'user_is_ultra_restricted'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required'
    | 'team_added_to_org'
    | 'missing_charset'
    | 'superfluous_charset';
};
// GET: /oauth.access
export type OAuthAccessResponse = {
  ok: ok_true;
};
// GET: /mpim.list
export type MPIMListResponse = {
  ok: ok_true;
};
// GET: /conversations.replies
export type ConversationsRepliesResponse = {
  has_more?: boolean;
  ok: ok_true;
  messages: {
    thread_ts: ts;
    subscribed: boolean;
    source_team?: team;
    last_read?: ts;
    user_profile?: UserProfileShort;
    text: string;
    team?: team;
    ts: ts;
    unread_count?: number;
    reply_count: number;
    user: user_id;
    replies: {
      ts: ts;
      user: user_id;
    }[]
    type: string;
    user_team?: team;
  }[]
  | {
    thread_ts: ts;
    source_team?: team;
    user_profile?: UserProfileShort;
    text: string;
    ts: ts;
    user: user_id;
    team?: team;
    parent_user_id: user_id;
    is_starred?: boolean;
    type: string;
    user_team?: team;
  }[]
} & {
  needed?: string;
  error:
    | 'missing_scope'
    | 'channel_not_found'
    | 'thread_not_found'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'team_added_to_org'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required';
  ok: ok_false;
  provided?: string;
};
// GET: /channels.replies
export type ChannelsRepliesResponse = {
  ok: ok_true;
};
// POST: /chat.postMessage
export type ChatPostMessageResponse = {
  message: Message;
  ok: ok_true;
  ts: ts;
  channel: channel;
} & {
  ok: ok_false;
  error:
    | 'channel_not_found'
    | 'not_in_channel'
    | 'is_archived'
    | 'msg_too_long'
    | 'no_text'
    | 'too_many_attachments'
    | 'rate_limited'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type';
};
// POST: /users.setActive
export type UsersSetActiveResponse = {
  ok: ok_true;
};
// POST: /conversations.archive
export type ConversationsArchiveResponse = {
  ok: ok_true;
} & {
  needed?: string;
  error:
    | 'method_not_supported_for_channel_type'
    | 'missing_scope'
    | 'not_supported'
    | 'channel_not_found'
    | 'already_archived'
    | 'cant_archive_general'
    | 'restricted_action'
    | 'not_authed'
    | 'invalid_auth'
    | 'account_inactive'
    | 'user_is_bot'
    | 'user_is_restricted'
    | 'user_is_ultra_restricted'
    | 'invalid_arg_name'
    | 'invalid_array_arg'
    | 'invalid_charset'
    | 'invalid_form_data'
    | 'invalid_post_type'
    | 'missing_post_type'
    | 'invalid_json'
    | 'json_not_object'
    | 'request_timeout'
    | 'upgrade_required'
    | 'team_added_to_org'
    | 'missing_charset'
    | 'superfluous_charset';
  ok: ok_false;
  provided?: string;
};
// GET: /team.profile.get
export type TeamProfileGetResponse = {
  ok: ok_false;
  error:
  | 'not_authed'
  | 'invalid_auth'
  | 'account_inactive'
  | 'no_permission'
  | 'user_is_bot'
  | 'invalid_arg_name'
  | 'invalid_array_arg'
  | 'invalid_charset'
  | 'invalid_form_data'
  | 'invalid_post_typ'
  | 'missing_post_type'
  | 'team_added_to_org'
  | 'invalid_json'
  | 'json_not_object'
  | 'request_timeou'
  | 'upgrade_required';
}
  & {
    profile: {
      fields: TeamProfileField[];
    };
    ok: ok_true;
  };
// POST: /groups.archive
export type GroupsArchiveResponse = {
  ok: ok_true;
};
// POST: /groups.unarchive
export type GroupsUnarchiveResponse = {
  ok: ok_true;
};
// POST: /stars.remove
export type StarsRemoveResponse = {
  ok: ok_true;
};
