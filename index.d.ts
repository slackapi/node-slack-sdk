// Type definitions for node-slack-sdk
// Project: https://github.com/slackapi/node-slack-sdk
// Definitions by: Bilal Aijazi <https://github.com/bmajz>

declare module '@slack/client' {
  class WebClient {
    constructor(
      token: string,
      options?: {
        slackAPIUrl?: string,
        transport?: any,
        retryConfig?: any,
        maxRequestConcurrency?: number,
        logLevel?: string,
        logger?: any,
      });

    on(event: CLIENT_EVENTS.WEB.RATE_LIMITED_TYPE, handler?: (headerSecs: number) => void): void;

    api: WebApiApi;
    auth: WebApiAuth;
    bots: WebApiBots;
    channels: WebApiChannels;
    chat: WebApiChat;
    dnd: WebApiDnd;
    emoji: WebApiEmoji;
    files: WebApiFiles;
    groups: WebApiGroups;
    im: WebApiIm;
    mpim: WebApiMpim;
    oauth: WebApiOauth;
    pins: WebApiPins;
    presence: WebApiPresence;
    reactions: WebApiReactions;
    reminders: WebApiReminders;
    rtm: WebApiRtm;
    search: WebApiSearch;
    stars: WebApiStars;
    team: WebApiTeam;
    usergroups: WebApiUsergroups;
    users: WebApiUsers;
  }

  class _RtmClientBase {
    ws: WebSocket;

    MAX_RECONNECTION_ATTEMPTS: number;
    RECONNECTION_BACKOFF: number;
    MAX_PONG_INTERVAL: number;
    WS_PING_INTERVAL: number;

    autoReconnect: boolean;

    connected: boolean;
    authenticated: boolean;
    activeUserId: string;
    activeTeamId: string;
    dataStore: MemoryDataStore;
    start(opts?: any): void;
    nextMessageId(): number;
    connect(socketUrl: string): void;
    disconnect(optErr?: Error, optCode?: any): void;
    reconnect(): void;
    handleWsOpen(): void;
    handleWsMessage(wsMsg: string): void;
    handleWsError(err: Error): void;
    handleWsClose(code: any, reason: any): void;
    sendMessage(text: string, channelId: string, optCb?: any): any;
    updateMessage(message: any, optCb?: any): any;
    sendTyping(channelId: string): void;
    send(message: any, optCb?: any): any;

    on(event: CLIENT_EVENTS.RTM.CONNECTING_TYPE, handler?: () => void): void;
    on(event: CLIENT_EVENTS.RTM.AUTHENTICATED_TYPE, handler?: (data?: RtmStartResult) => void): void;
    on(event: CLIENT_EVENTS.RTM.WS_OPENING_TYPE, handler?: () => void): void;
    on(event: CLIENT_EVENTS.RTM.WS_OPENED_TYPE, handler?: () => void): void;
    on(event: CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED_TYPE, handler?: () => void): void;
    on(event: CLIENT_EVENTS.RTM.DISCONNECT_TYPE, handler?: (optError?: Error, optCode?: number) => void): void;
    on(event: CLIENT_EVENTS.RTM.UNABLE_TO_RTM_START_TYPE, handler?: (err?: Error) => void): void;
    on(event: CLIENT_EVENTS.RTM.WS_CLOSE_TYPE, handler?: (code?: number, reason?: string) => void): void;
    on(event: CLIENT_EVENTS.RTM.WS_ERROR_TYPE, handler?: (err?: Error) => void): void;
    on(event: CLIENT_EVENTS.RTM.ATTEMPTING_RECONNECT_TYPE, handler?: () => void): void;
    on(event: CLIENT_EVENTS.RTM.RAW_MESSAGE_TYPE, handler?: (wsMsg: string) => void): void;

    on(event: RTM_EVENTS.ACCOUNTS_CHANGED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.BOT_ADDED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.BOT_CHANGED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.CHANNEL_ARCHIVE_TYPE, handler?: (data: ChannelArchiveEvent) => void): void;
    on(event: RTM_EVENTS.CHANNEL_CREATED_TYPE, handler?: (data: ChannelCreatedEvent) => void): void;
    on(event: RTM_EVENTS.CHANNEL_DELETED_TYPE, handler?: (data: ChannelDeletedEvent) => void): void;
    on(event: RTM_EVENTS.CHANNEL_HISTORY_CHANGED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.CHANNEL_JOINED_TYPE, handler?: (data: ChannelJoinedEvent) => void): void;
    on(event: RTM_EVENTS.CHANNEL_LEFT_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.CHANNEL_MARKED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.CHANNEL_RENAME_TYPE, handler?: (data: ChannelRenameEvent) => void): void;
    on(event: RTM_EVENTS.CHANNEL_UNARCHIVE_TYPE, handler?: (data: ChannelUnarchiveEvent) => void): void;
    on(event: RTM_EVENTS.COMMANDS_CHANGED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.DND_UPDATED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.DND_UPDATED_USER_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.EMAIL_DOMAIN_CHANGED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.EMOJI_CHANGED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.FILE_CHANGE_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.FILE_COMMENT_ADDED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.FILE_COMMENT_DELETED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.FILE_COMMENT_EDITED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.FILE_CREATED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.FILE_DELETED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.FILE_PRIVATE_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.FILE_PUBLIC_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.FILE_SHARED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.FILE_UNSHARED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.GROUP_ARCHIVE_TYPE, handler?: (data: GroupArchiveEvent) => void): void;
    on(event: RTM_EVENTS.GROUP_CLOSE_TYPE, handler?: (data: GroupCloseEvent) => void): void;
    on(event: RTM_EVENTS.GROUP_HISTORY_CHANGED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.GROUP_JOINED_TYPE, handler?: (data: GroupJoinedEvent) => void): void;
    on(event: RTM_EVENTS.GROUP_LEFT_TYPE, handler?: (data: GroupLeftEvent) => void): void;
    on(event: RTM_EVENTS.GROUP_MARKED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.GROUP_OPEN_TYPE, handler?: (data: GroupOpenEvent) => void): void;
    on(event: RTM_EVENTS.GROUP_RENAME_TYPE, handler?: (data: GroupRenameEvent) => void): void;
    on(event: RTM_EVENTS.GROUP_UNARCHIVE_TYPE, handler?: (data: GroupUnarchiveEvent) => void): void;
    on(event: RTM_EVENTS.HELLO_TYPE, handler?: (data: HelloEvent) => void): void;
    on(event: RTM_EVENTS.IM_CLOSE_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.IM_CREATED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.IM_HISTORY_CHANGED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.IM_MARKED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.IM_OPEN_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.MANUAL_PRESENCE_CHANGE_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.MESSAGE_TYPE, handler?: (data: MessageEvent) => void): void;
    on(event: RTM_EVENTS.MPIM_CLOSE_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.MPIM_HISTORY_CHANGED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.MPIM_JOINED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.MPIM_OPEN_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.PIN_ADDED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.PIN_REMOVED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.PREF_CHANGE_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.PRESENCE_CHANGE_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.REACTION_ADDED_TYPE, handler?: (data: ReactionEvent) => void): void;
    on(event: RTM_EVENTS.REACTION_REMOVED_TYPE, handler?: (data: ReactionEvent) => void): void;
    on(event: RTM_EVENTS.RECONNECT_URL_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.STAR_ADDED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.STAR_REMOVED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.SUBTEAM_CREATED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.SUBTEAM_SELF_ADDED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.SUBTEAM_SELF_REMOVED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.SUBTEAM_UPDATED_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.TEAM_DOMAIN_CHANGE_TYPE, handler?: (data: TeamDomainChangeEvent) => void): void;
    on(event: RTM_EVENTS.TEAM_JOIN_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.TEAM_MIGRATION_STARTED_TYPE, handler?: (data: TeamMigrationStartedEvent) => void): void;
    on(event: RTM_EVENTS.TEAM_PLAN_CHANGE_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.TEAM_PREF_CHANGE_TYPE, handler?: (data: TeamPrefChangeEvent) => void): void;
    on(event: RTM_EVENTS.TEAM_PROFILE_CHANGE_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.TEAM_PROFILE_DELETE_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.TEAM_PROFILE_REORDER_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.TEAM_RENAME_TYPE, handler?: (data: TeamRenameEvent) => void): void;
    on(event: RTM_EVENTS.USER_CHANGE_TYPE, handler?: (data: any) => void): void;
    on(event: RTM_EVENTS.USER_TYPING_TYPE, handler?: (data: UserTypingEvent) => void): void;
  }

  class RtmClient extends _RtmClientBase {
    constructor(
      token: string,
      options?: {
        socketFn?: any,
        dataStore?: MemoryDataStore | null | undefined | false,
        autoReconnect?: boolean,
        useRtmConnect?: boolean,
        maxReconnectionAttempts?: number,
        reconnectionBackoff?: number,
        wsPingInterval?: number,
        maxPongInterval?: number,
        slackAPIUrl?: string,
        transport?: any,
        retryConfig?: any,
        maxRequestConcurrency?: number,
        logLevel?: string,
        logger?: any,
      }
    );
  }

  class IncomingWebhook {
    constructor(slackUrl: string, defaults?: {
      username?: string,
      iconEmoji?: string,
      iconUrl?: string,
      channel?: string,
      text?: string
    });

    send(message: string | ChatPostMessageParams, cb: (err: Error, result: ChatPostMessageResult) => void): void;
    send(message: string | ChatPostMessageParams): Promise<ChatPostMessageResult>;
  }

  class LegacyRtmClient extends _RtmClientBase {
    constructor(token: string, autoReconnect?: boolean);
  }

  namespace CLIENT_EVENTS {
    namespace WEB {
      type RATE_LIMITED_TYPE = 'rate_limited';
      export const RATE_LIMITED: RATE_LIMITED_TYPE;
    }
    namespace RTM {
      type CONNECTING_TYPE = 'connecting';
      export const CONNECTING: CONNECTING_TYPE;

      type AUTHENTICATED_TYPE = 'authenticated';
      export const AUTHENTICATED: AUTHENTICATED_TYPE;

      type WS_OPENING_TYPE = 'ws_opening';
      export const WS_OPENING: WS_OPENING_TYPE;

      type WS_OPENED_TYPE = 'ws_opened';
      export const WS_OPENED: WS_OPENED_TYPE;

      type RTM_CONNECTION_OPENED_TYPE = 'open';
      export const RTM_CONNECTION_OPENED: RTM_CONNECTION_OPENED_TYPE;

      type DISCONNECT_TYPE = 'disconnect';
      export const DISCONNECT: DISCONNECT_TYPE;

      type UNABLE_TO_RTM_START_TYPE = 'unable_to_rtm_start';
      export const UNABLE_TO_RTM_START: UNABLE_TO_RTM_START_TYPE;

      type WS_CLOSE_TYPE = 'ws_close';
      export const WS_CLOSE: WS_CLOSE_TYPE;

      type WS_ERROR_TYPE = 'ws_error';
      export const WS_ERROR: WS_ERROR_TYPE;

      type ATTEMPTING_RECONNECT_TYPE = 'attempting_reconnect';
      export const ATTEMPTING_RECONNECT: ATTEMPTING_RECONNECT_TYPE;

      type RAW_MESSAGE_TYPE = 'raw_message';
      export const RAW_MESSAGE: RAW_MESSAGE_TYPE;
    }
  }

  namespace RTM_EVENTS {
    type ACCOUNTS_CHANGED_TYPE = 'accounts_changed';
    export const ACCOUNTS_CHANGED: ACCOUNTS_CHANGED_TYPE;
    type BOT_ADDED_TYPE = 'bot_added';
    export const BOT_ADDED: BOT_ADDED_TYPE;
    type BOT_CHANGED_TYPE = 'bot_changed';
    export const BOT_CHANGED: BOT_CHANGED_TYPE;
    type CHANNEL_ARCHIVE_TYPE = 'channel_archive';
    export const CHANNEL_ARCHIVE: CHANNEL_ARCHIVE_TYPE;
    type CHANNEL_CREATED_TYPE = 'channel_created';
    export const CHANNEL_CREATED: CHANNEL_CREATED_TYPE;
    type CHANNEL_DELETED_TYPE = 'channel_deleted';
    export const CHANNEL_DELETED: CHANNEL_DELETED_TYPE;
    type CHANNEL_HISTORY_CHANGED_TYPE = 'channel_history_changed';
    export const CHANNEL_HISTORY_CHANGED: CHANNEL_HISTORY_CHANGED_TYPE;
    type CHANNEL_JOINED_TYPE = 'channel_joined';
    export const CHANNEL_JOINED: CHANNEL_JOINED_TYPE;
    type CHANNEL_LEFT_TYPE = 'channel_left';
    export const CHANNEL_LEFT: CHANNEL_LEFT_TYPE;
    type CHANNEL_MARKED_TYPE = 'channel_marked';
    export const CHANNEL_MARKED: CHANNEL_MARKED_TYPE;
    type CHANNEL_RENAME_TYPE = 'channel_rename';
    export const CHANNEL_RENAME: CHANNEL_RENAME_TYPE;
    type CHANNEL_UNARCHIVE_TYPE = 'channel_unarchive';
    export const CHANNEL_UNARCHIVE: CHANNEL_UNARCHIVE_TYPE;
    type COMMANDS_CHANGED_TYPE = 'commands_changed';
    export const COMMANDS_CHANGED: COMMANDS_CHANGED_TYPE;
    type DND_UPDATED_TYPE = 'dnd_updated';
    export const DND_UPDATED: DND_UPDATED_TYPE;
    type DND_UPDATED_USER_TYPE = 'dnd_updated_user';
    export const DND_UPDATED_USER: DND_UPDATED_USER_TYPE;
    type EMAIL_DOMAIN_CHANGED_TYPE = 'email_domain_changed';
    export const EMAIL_DOMAIN_CHANGED: EMAIL_DOMAIN_CHANGED_TYPE;
    type EMOJI_CHANGED_TYPE = 'emoji_changed';
    export const EMOJI_CHANGED: EMOJI_CHANGED_TYPE;
    type FILE_CHANGE_TYPE = 'file_change';
    export const FILE_CHANGE: FILE_CHANGE_TYPE;
    type FILE_COMMENT_ADDED_TYPE = 'file_comment_added';
    export const FILE_COMMENT_ADDED: FILE_COMMENT_ADDED_TYPE;
    type FILE_COMMENT_DELETED_TYPE = 'file_comment_deleted';
    export const FILE_COMMENT_DELETED: FILE_COMMENT_DELETED_TYPE;
    type FILE_COMMENT_EDITED_TYPE = 'file_comment_edited';
    export const FILE_COMMENT_EDITED: FILE_COMMENT_EDITED_TYPE;
    type FILE_CREATED_TYPE = 'file_created';
    export const FILE_CREATED: FILE_CREATED_TYPE;
    type FILE_DELETED_TYPE = 'file_deleted';
    export const FILE_DELETED: FILE_DELETED_TYPE;
    type FILE_PRIVATE_TYPE = 'file_private';
    export const FILE_PRIVATE: FILE_PRIVATE_TYPE;
    type FILE_PUBLIC_TYPE = 'file_public';
    export const FILE_PUBLIC: FILE_PUBLIC_TYPE;
    type FILE_SHARED_TYPE = 'file_shared';
    export const FILE_SHARED: FILE_SHARED_TYPE;
    type FILE_UNSHARED_TYPE = 'file_unshared';
    export const FILE_UNSHARED: FILE_UNSHARED_TYPE;
    type GROUP_ARCHIVE_TYPE = 'group_archive';
    export const GROUP_ARCHIVE: GROUP_ARCHIVE_TYPE;
    type GROUP_CLOSE_TYPE = 'group_close';
    export const GROUP_CLOSE: GROUP_CLOSE_TYPE;
    type GROUP_HISTORY_CHANGED_TYPE = 'group_history_changed';
    export const GROUP_HISTORY_CHANGED: GROUP_HISTORY_CHANGED_TYPE;
    type GROUP_JOINED_TYPE = 'group_joined';
    export const GROUP_JOINED: GROUP_JOINED_TYPE;
    type GROUP_LEFT_TYPE = 'group_left';
    export const GROUP_LEFT: GROUP_LEFT_TYPE;
    type GROUP_MARKED_TYPE = 'group_marked';
    export const GROUP_MARKED: GROUP_MARKED_TYPE;
    type GROUP_OPEN_TYPE = 'group_open';
    export const GROUP_OPEN: GROUP_OPEN_TYPE;
    type GROUP_RENAME_TYPE = 'group_rename';
    export const GROUP_RENAME: GROUP_RENAME_TYPE;
    type GROUP_UNARCHIVE_TYPE = 'group_unarchive';
    export const GROUP_UNARCHIVE: GROUP_UNARCHIVE_TYPE;
    type HELLO_TYPE = 'hello';
    export const HELLO: HELLO_TYPE;
    type IM_CLOSE_TYPE = 'im_close';
    export const IM_CLOSE: IM_CLOSE_TYPE;
    type IM_CREATED_TYPE = 'im_created';
    export const IM_CREATED: IM_CREATED_TYPE;
    type IM_HISTORY_CHANGED_TYPE = 'im_history_changed';
    export const IM_HISTORY_CHANGED: IM_HISTORY_CHANGED_TYPE;
    type IM_MARKED_TYPE = 'im_marked';
    export const IM_MARKED: IM_MARKED_TYPE;
    type IM_OPEN_TYPE = 'im_open';
    export const IM_OPEN: IM_OPEN_TYPE;
    type MANUAL_PRESENCE_CHANGE_TYPE = 'manual_presence_change';
    export const MANUAL_PRESENCE_CHANGE: MANUAL_PRESENCE_CHANGE_TYPE;
    type MESSAGE_TYPE = 'message';
    export const MESSAGE: MESSAGE_TYPE;
    type MPIM_CLOSE_TYPE = 'mpim_close';
    export const MPIM_CLOSE: MPIM_CLOSE_TYPE;
    type MPIM_HISTORY_CHANGED_TYPE = 'mpim_history_changed';
    export const MPIM_HISTORY_CHANGED: MPIM_HISTORY_CHANGED_TYPE;
    type MPIM_JOINED_TYPE = 'mpim_joined';
    export const MPIM_JOINED: MPIM_JOINED_TYPE;
    type MPIM_OPEN_TYPE = 'mpim_open';
    export const MPIM_OPEN: MPIM_OPEN_TYPE;
    type PIN_ADDED_TYPE = 'pin_added';
    export const PIN_ADDED: PIN_ADDED_TYPE;
    type PIN_REMOVED_TYPE = 'pin_removed';
    export const PIN_REMOVED: PIN_REMOVED_TYPE;
    type PREF_CHANGE_TYPE = 'pref_change';
    export const PREF_CHANGE: PREF_CHANGE_TYPE;
    type PRESENCE_CHANGE_TYPE = 'presence_change';
    export const PRESENCE_CHANGE: PRESENCE_CHANGE_TYPE;
    type REACTION_ADDED_TYPE = 'reaction_added';
    export const REACTION_ADDED: REACTION_ADDED_TYPE;
    type REACTION_REMOVED_TYPE = 'reaction_removed';
    export const REACTION_REMOVED: REACTION_REMOVED_TYPE;
    type RECONNECT_URL_TYPE = 'reconnect_url';
    export const RECONNECT_URL: RECONNECT_URL_TYPE;
    type STAR_ADDED_TYPE = 'star_added';
    export const STAR_ADDED: STAR_ADDED_TYPE;
    type STAR_REMOVED_TYPE = 'star_removed';
    export const STAR_REMOVED: STAR_REMOVED_TYPE;
    type SUBTEAM_CREATED_TYPE = 'subteam_created';
    export const SUBTEAM_CREATED: SUBTEAM_CREATED_TYPE;
    type SUBTEAM_SELF_ADDED_TYPE = 'subteam_self_added';
    export const SUBTEAM_SELF_ADDED: SUBTEAM_SELF_ADDED_TYPE;
    type SUBTEAM_SELF_REMOVED_TYPE = 'subteam_self_removed';
    export const SUBTEAM_SELF_REMOVED: SUBTEAM_SELF_REMOVED_TYPE;
    type SUBTEAM_UPDATED_TYPE = 'subteam_updated';
    export const SUBTEAM_UPDATED: SUBTEAM_UPDATED_TYPE;
    type TEAM_DOMAIN_CHANGE_TYPE = 'team_domain_change';
    export const TEAM_DOMAIN_CHANGE: TEAM_DOMAIN_CHANGE_TYPE;
    type TEAM_JOIN_TYPE = 'team_join';
    export const TEAM_JOIN: TEAM_JOIN_TYPE;
    type TEAM_MIGRATION_STARTED_TYPE = 'team_migration_started';
    export const TEAM_MIGRATION_STARTED: TEAM_MIGRATION_STARTED_TYPE;
    type TEAM_PLAN_CHANGE_TYPE = 'team_plan_change';
    export const TEAM_PLAN_CHANGE: TEAM_PLAN_CHANGE_TYPE;
    type TEAM_PREF_CHANGE_TYPE = 'team_pref_change';
    export const TEAM_PREF_CHANGE: TEAM_PREF_CHANGE_TYPE;
    type TEAM_PROFILE_CHANGE_TYPE = 'team_profile_change';
    export const TEAM_PROFILE_CHANGE: TEAM_PROFILE_CHANGE_TYPE;
    type TEAM_PROFILE_DELETE_TYPE = 'team_profile_delete';
    export const TEAM_PROFILE_DELETE: TEAM_PROFILE_DELETE_TYPE;
    type TEAM_PROFILE_REORDER_TYPE = 'team_profile_reorder';
    export const TEAM_PROFILE_REORDER: TEAM_PROFILE_REORDER_TYPE;
    type TEAM_RENAME_TYPE = 'team_rename';
    export const TEAM_RENAME: TEAM_RENAME_TYPE;
    type USER_CHANGE_TYPE = 'user_change';
    export const USER_CHANGE: USER_CHANGE_TYPE;
    type USER_TYPING_TYPE = 'user_typing';
    export const USER_TYPING: USER_TYPING_TYPE;
  }

  namespace RTM_MESSAGE_SUBTYPES {
    type BOT_MESSAGE_TYPE = 'bot_message';
    export const BOT_MESSAGE: BOT_MESSAGE_TYPE;
    type CHANNEL_ARCHIVE_TYPE = 'channel_archive';
    export const CHANNEL_ARCHIVE: CHANNEL_ARCHIVE_TYPE;
    type CHANNEL_JOIN_TYPE = 'channel_join';
    export const CHANNEL_JOIN: CHANNEL_JOIN_TYPE;
    type CHANNEL_LEAVE_TYPE = 'channel_leave';
    export const CHANNEL_LEAVE: CHANNEL_LEAVE_TYPE;
    type CHANNEL_NAME_TYPE = 'channel_name';
    export const CHANNEL_NAME: CHANNEL_NAME_TYPE;
    type CHANNEL_PURPOSE_TYPE = 'channel_purpose';
    export const CHANNEL_PURPOSE: CHANNEL_PURPOSE_TYPE;
    type CHANNEL_TOPIC_TYPE = 'channel_topic';
    export const CHANNEL_TOPIC: CHANNEL_TOPIC_TYPE;
    type CHANNEL_UNARCHIVE_TYPE = 'channel_unarchive';
    export const CHANNEL_UNARCHIVE: CHANNEL_UNARCHIVE_TYPE;
    type FILE_COMMENT_TYPE = 'file_comment';
    export const FILE_COMMENT: FILE_COMMENT_TYPE;
    type FILE_MENTION_TYPE = 'file_mention';
    export const FILE_MENTION: FILE_MENTION_TYPE;
    type FILE_SHARE_TYPE = 'file_share';
    export const FILE_SHARE: FILE_SHARE_TYPE;
    type GROUP_ARCHIVE_TYPE = 'group_archive';
    export const GROUP_ARCHIVE: GROUP_ARCHIVE_TYPE;
    type GROUP_JOIN_TYPE = 'group_join';
    export const GROUP_JOIN: GROUP_JOIN_TYPE;
    type GROUP_LEAVE_TYPE = 'group_leave';
    export const GROUP_LEAVE: GROUP_LEAVE_TYPE;
    type GROUP_NAME_TYPE = 'group_name';
    export const GROUP_NAME: GROUP_NAME_TYPE;
    type GROUP_PURPOSE_TYPE = 'group_purpose';
    export const GROUP_PURPOSE: GROUP_PURPOSE_TYPE;
    type GROUP_TOPIC_TYPE = 'group_topic';
    export const GROUP_TOPIC: GROUP_TOPIC_TYPE;
    type GROUP_UNARCHIVE_TYPE = 'group_unarchive';
    export const GROUP_UNARCHIVE: GROUP_UNARCHIVE_TYPE;
    type ME_MESSAGE_TYPE = 'me_message';
    export const ME_MESSAGE: ME_MESSAGE_TYPE;
    type MESSAGE_CHANGED_TYPE = 'message_changed';
    export const MESSAGE_CHANGED: MESSAGE_CHANGED_TYPE;
    type MESSAGE_DELETED_TYPE = 'message_deleted';
    export const MESSAGE_DELETED: MESSAGE_DELETED_TYPE;
    type PINNED_ITEM_TYPE = 'pinned_item';
    export const PINNED_ITEM: PINNED_ITEM_TYPE;
    type UNPINNED_ITEM_TYPE = 'unpinned_item';
    export const UNPINNED_ITEM: UNPINNED_ITEM_TYPE;
  }

  class MemoryDataStore {
    constructor(opts: any);

    registerMessageHandler(event: any, handler: any): void;
    clear(): void;

    users: any;
    channels: any;
    dms: any;
    groups: any;
    bots: any;
    teams: any;
    clear(): void;

    // Getters
    getUserById(userId: string): any;
    getUserByName(name: string): any;
    getUserByEmail(email: string): any;
    getUserByBotId(botId: string): any;
    getChannelById(channelId: string): any;
    getChannelByName(name: string): any;
    getGroupById(groupId: string): any;
    getGroupByName(name: string): any;
    getDMById(dmId: string): any;
    getDMByName(name: string): any;
    getDMByUserId(id: string): any;
    getBotById(botId: string): any;
    getBotByName(name: string): any;
    getBotByUserId(userId: string): any;
    getTeamById(teamId: string): any;
    getUnreadCount(): any;

    // Setters
    setChannel(channel: any): void;
    setGroup(group: any): void;
    setDM(dm: any): void;
    setUser(user: any): void;
    setBot(bot: any): void;
    setTeam(team: any): void;

    // Upserts
    upsertChannel(channel: any): void;
    upsertGroup(group: any): void;
    upsertDM(dm: any): void;
    upsertUser(user: any): void;
    upsertBot(bot: any): void;
    upsertTeam(team: any): void;

    // Deletion
    removeChannel(channelId: string): void;
    removeGroup(groupId: string): void;
    removeDM(dmId: string): void;
    removeUser(userId: string): void;
    removeBot(botId: string): void;
    removeTeam(teamId: string): void;

    // Helpers
    upsertChannelGroupOrDMById(id: string, obj: any): void;
    getChannelGroupOrDMById(objId: string): any;
    getChannelOrGroupByName(name: string): any;

    // Web API response handlers
    cacheRtmStart(data: any): void;

    // RTM Message handlers
    handleRtmMessage(activeUserId: string, activeTeamId: string, messageType: string, message: Object): void;
  }

  // Web API interfaces
  // https://api.slack.com/web
  interface WebApiApi {
    test(callback: (err: Error, result: ApiTestResult) => void): void;
    test(opts: ApiTestParams, callback: (err: Error, result: ApiTestResult) => void): void;
    test(opts?: ApiTestParams): Promise<ApiTestResult>;
  }

  interface WebApiAuth {
    revoke(callback: (err: Error, result: AuthRevokeResult) => void): void;
    revoke(opts: AuthRevokeParams, callback: (err: Error, result: AuthRevokeResult) => void): void;
    revoke(opts?: AuthRevokeParams): Promise<AuthRevokeResult>;

    test(callback: (err: Error, result: AuthTestResult) => void): void;
    test(): Promise<AuthTestResult>;
  }

  interface WebApiBots {
    info(callback: (err: Error, result: BotsInfoResult) => void): void;
    info(opts: BotsInfoParams, callback: (err: Error, result: BotsInfoResult) => void): void;
    info(opts?: BotsInfoParams): Promise<BotsInfoResult>;
  }

  interface WebApiChannels {
    archive(channel: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    archive(channel: string): Promise<WebApiResultAny>;

    create(name: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    create(name: string): Promise<WebApiResultAny>;

    history(callback: (err: Error, result: WebApiResultAny) => void): void;
    history(channel: string, opts: Object, callback: (err: Error, result: WebApiResultAny) => void): void;
    history(channel: string, opts?: Object): Promise<WebApiResultAny>;

    info(channel: string, callback: (err: Error, result: ChannelsInfoResult) => void): void;
    info(channel: string): Promise<ChannelsInfoResult>;

    invite(channel: string, user: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    invite(channel: string, user: string): Promise<WebApiResultAny>;

    join(name: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    join(name: string): Promise<WebApiResultAny>;

    kick(channel: string, user: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    kick(channel: string, user: string): Promise<WebApiResultAny>;

    leave(channel: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    leave(channel: string): Promise<WebApiResultAny>;

    list(callback: (err: Error, result: ChannelsListResult) => void): void;
    list(opts: ChannelsListParams, callback: (err: Error, result: ChannelsListResult) => void): void;
    list(opts?: ChannelsListParams): Promise<ChannelsListResult>;

    mark(channel: string, ts: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    mark(channel: string, ts: string): Promise<WebApiResultAny>;

    rename(channel: string, name: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    rename(channel: string, name: string): Promise<WebApiResultAny>;

    replies(channel: string, thead_ts: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    replies(channel: string, thead_ts: string): Promise<WebApiResultAny>;

    setPurpose(channel: string, purpose: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    setPurpose(channel: string, purpose: string): Promise<WebApiResultAny>;

    setTopic(channel: string, topic: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    setTopic(channel: string, topic: string): Promise<WebApiResultAny>;

    unarchive(channel: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    unarchive(channel: string): Promise<WebApiResultAny>;
  }

  interface WebApiChat {
    delete(ts: string, channel: string, callback: (err: Error, result: ChatDeleteResult) => void): void;
    delete(ts: string, channel: string, opts: ChatDeleteParams, callback: (err: Error, result: ChatDeleteResult) => void): void;
    delete(ts: string, channel: string, opts?: ChatDeleteParams): Promise<ChatDeleteResult>;

    meMessage(channel: string, text: string, callback: (err: Error, result: ChatMeMessageResult) => void): void;
    meMessage(channel: string, text: string): Promise<ChatMeMessageResult>;

    postMessage(channel: string, text: string, callback: (err: Error, result: ChatPostMessageResult) => void): void;
    postMessage(channel: string, text: string, opts: ChatPostMessageParams, callback: (err: Error, result: ChatPostMessageResult) => void): void;
    postMessage(channel: string, text: string, opts?: ChatPostMessageParams): Promise<ChatPostMessageResult>;

    unfurl(ts: string, channel: string, unfurls: string, callback: (err: Error, result: WebApiResult) => void): void;
    unfurl(ts: string, channel: string, unfurls: string, opts: Object, callback: (err: Error, result: WebApiResult) => void): void;
    unfurl(ts: string, channel: string, unfurls: string, opts?: Object): Promise<WebApiResult>;

    update(ts: string, channel: string, text: string, callback: (err: Error, result: ChatUpdateResult) => void): void;
    update(ts: string, channel: string, text: string, opts: ChatUpdateParams, callback: (err: Error, result: ChatUpdateResult) => void): void;
    update(ts: string, channel: string, text: string, opts?: ChatUpdateParams): Promise<ChatUpdateResult>;
  }

  interface WebApiDnd {
    endDnd(callback: (err: Error, result: WebApiResultAny) => void): void;
    endDnd(): Promise<WebApiResultAny>;

    endSnooze(callback: (err: Error, result: WebApiResultAny) => void): void;
    endSnooze():Promise<WebApiResultAny>;

    info(callback: (err: Error, result: WebApiResultAny) => void): void;
    info(opts: Object, callback: (err: Error, result: WebApiResultAny) => void): void;
    info(opts?: Object): Promise<WebApiResultAny>;

    setSnooze(numMinutes: number, callback: (err: Error, result: WebApiResultAny) => void): void;
    setSnooze(numMinutes: number): Promise<WebApiResultAny>;

    teamInfo(callback: (err: Error, result: WebApiResultAny) => void): void;
    teamInfo(opts: Object, callback: (err: Error, result: WebApiResultAny) => void): void;
    teamInfo(opts?: Object): Promise<WebApiResultAny>;
  }

  interface WebApiEmoji {
    list(callback: (err: Error, result: WebApiResultAny) => void): void;
    list():Promise<WebApiResultAny>;
  }

  interface WebApiFiles {
    delete(file: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    delete(file: string): Promise<WebApiResultAny>;

    info(file: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    info(file: string, opts: Object, callback: (err: Error, result: WebApiResultAny) => void): void;
    info(file: string, opts?: Object): Promise<WebApiResultAny>;

    list(callback: (err: Error, result: WebApiResultAny) => void): void;
    list(opts: Object, callback: (err: Error, result: WebApiResultAny) => void): void;
    list(opts?: Object): Promise<WebApiResultAny>;

    revokePublicURL(file: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    revokePublicURL(file: string): Promise<WebApiResultAny>;

    sharedPublicURL(file: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    sharedPublicURL(file: string): Promise<WebApiResultAny>;

    upload(filename: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    upload(filename: string, opts: Object, callback: (err: Error, result: WebApiResultAny) => void): void;
    upload(filename: string, opts?: Object): Promise<WebApiResultAny>;

    comments: {
      add(file: string, comment: string, callback: (err: Error, result: WebApiResultAny) => void): void;
      add(file: string, comment: string, opts: Object, callback: (err: Error, result: WebApiResultAny) => void): void;
      add(file: string, comment: string, opts?: Object): Promise<WebApiResultAny>;

      delete(file: string, id: string, callback: (err: Error, result: WebApiResultAny) => void): void;
      delete(file: string, id: string): Promise<WebApiResultAny>;

      edit(file: string, id: string, comment: string, callback: (err: Error, result: WebApiResultAny) => void): void;
      edit(file: string, id: string, comment: string): Promise<WebApiResultAny>;
    }
  }

  interface WebApiGroups {
    archive(channel: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    archive(channel: string): Promise<WebApiResultAny>;

    close(channel: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    close(channel: string): Promise<WebApiResultAny>;

    create(name: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    create(name: string): Promise<WebApiResultAny>;

    createChild(channel: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    createChild(channel: string): Promise<WebApiResultAny>;

    history(channel: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    history(channel: string, opts: Object, callback: (err: Error, result: WebApiResultAny) => void): void;
    history(channel: string, opts?: Object): Promise<WebApiResultAny>;

    info(channel: string, callback: (err: Error, result: GroupsInfoResult) => void): void;
    info(channel: string): Promise<GroupsInfoResult>;

    invite(channel: string, user: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    invite(channel: string, user: string): Promise<WebApiResultAny>;

    kick(channel: string, user: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    kick(channel: string, user: string): Promise<WebApiResultAny>;

    leave(channel: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    leave(channel: string): Promise<WebApiResultAny>;

    list(callback: (err: Error, result: GroupsListResult) => void): void;
    list(opts: ChannelsListParams, callback: (err: Error, result: GroupsListResult) => void): void;
    list(opts?: ChannelsListParams): Promise<GroupsListResult>;

    mark(channel: string, ts: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    mark(channel: string, ts: string): Promise<WebApiResultAny>;

    open(channel: string, ts: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    open(channel: string, ts: string): Promise<WebApiResultAny>;

    rename(channel: string, name: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    rename(channel: string, name: string): Promise<WebApiResultAny>;

    replies(channel: string, thead_ts: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    replies(channel: string, thead_ts: string): Promise<WebApiResultAny>;

    setPurpose(channel: string, purpose: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    setPurpose(channel: string, purpose: string): Promise<WebApiResultAny>;

    setTopic(channel: string, topic: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    setTopic(channel: string, topic: string): Promise<WebApiResultAny>;

    unarchive(channel: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    unarchive(channel: string): Promise<WebApiResultAny>;
  }

  interface WebApiIm {
    close(channel: string, callback: (err: Error, result: ImCloseResult) => void): void;
    close(channel: string): Promise<ImCloseResult>;

    history(channel: string, callback: (err: Error, result: ImHistoryResult) => void): void;
    history(channel: string, opts: ImHistoryParams, callback: (err: Error, result: ImHistoryResult) => void): void;
    history(channel: string, opts?: ImHistoryParams): Promise<ImHistoryResult>;

    list(callback: (err: Error, result: ImListResult) => void): void;
    list(): Promise<ImListResult>;

    mark(channel: string, ts: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    mark(channel: string, ts: string): Promise<WebApiResultAny>;

    open(user: string, callback: (err: Error, result: ImOpenResult) => void): void;
    open(user: string, opts: ImOpenParams, callback: (err: Error, result: ImOpenResult) => void): void;
    open(user: string, opts?: ImOpenParams): Promise<ImOpenResult>;

    replies(channel: string, thread_ts: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    replies(channel: string, thread_ts: string): Promise<WebApiResultAny>;
  }

  interface WebApiMpim {
    close(channel: string, callback: (err: Error, result: ImCloseResult) => void): void;
    close(channel: string): Promise<ImCloseResult>;

    history(channel: string, callback: (err: Error, result: ImHistoryResult) => void): void;
    history(channel: string, opts: ImHistoryParams, callback: (err: Error, result: ImHistoryResult) => void): void;
    history(channel: string, opts?: ImHistoryParams): Promise<ImHistoryResult>;

    list(callback: (err: Error, result: GroupsListResult) => void): void;
    list(): Promise<GroupsListResult>;

    mark(channel: string, ts: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    mark(channel: string, ts: string): Promise<WebApiResultAny>;

    open(users: string, callback: (err: Error, result: GroupsInfoResult) => void): void;
    open(users: string): Promise<GroupsInfoResult>;

    replies(channel: string, thread_ts: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    replies(channel: string, thread_ts: string): Promise<WebApiResultAny>;
  }

  interface WebApiOauth {
    access(clientId: string, clientSecret: string, code: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    access(clientId: string, clientSecret: string, code: string, opts: Object, callback: (err: Error, result: WebApiResultAny) => void): void;
    access(clientId: string, clientSecret: string, code: string, opts?: Object): Promise<WebApiResultAny>;
  }

  interface WebApiPins {
    add(channel: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    add(channel: string, opts: Object, callback: (err: Error, result: WebApiResultAny) => void): void;
    add(channel: string, opts?: Object): Promise<WebApiResultAny>;

    list(channel: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    list(channel: string): Promise<WebApiResultAny>;

    remove(channel: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    remove(channel: string, opts: Object, callback: (err: Error, result: WebApiResultAny) => void): void;
    remove(channel: string, opts?: Object): Promise<WebApiResultAny>;
  }

  interface WebApiPresence {
    set(presence: 'active'|'away', callback: (err: Error, result: WebApiResult) => void): void;
    set(presence: 'active'|'away'): Promise<WebApiResult>;
  }

  interface WebApiReactions {
    add(name: string, callback: (err: Error, result: ReactionsAddResult) => void): void;
    add(name: string, callback: (err: Error, result: ReactionsAddResult) => void): void;
    add(name: string, opts?: ReactionsAddParams): Promise<ReactionsAddResult>;

    get(callback: (err: Error, result: WebApiResultAny) => void): void;
    get(opts: Object, callback: (err: Error, result: WebApiResultAny) => void): void;
    get(opts?: Object): Promise<WebApiResultAny>;

    list(opts?: Object, callback?: (err: Error, result: Object) => void): void;
    list(opts?: Object): Promise<WebApiResultAny>;

    remove(name: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    remove(name: string, opts: Object, callback: (err: Error, result: WebApiResultAny) => void): void;
    remove(name: string, opts?: Object): Promise<WebApiResultAny>;
  }

  interface WebApiReminders {
    add(text: string, time: string, callback: (err: Error, result: WebApiResultAny) => void): void;
    add(text: string, time: string, opts: Object, callback: (err: Error, result: Object) => void): void;
    add(text: string, time: string, opts?: Object): Promise<WebApiResultAny>;

    complete(reminder: string, callback: (err: Error, result: Object) => void): void;
    complete(reminder: string): Promise<WebApiResultAny>;

    delete(reminder: string, callback: (err: Error, result: Object) => void): void;
    delete(reminder: string): Promise<WebApiResultAny>;

    info(reminder: string, callback: (err: Error, result: Object) => void): void;
    info(reminder: string): Promise<WebApiResultAny>;

    list(callback: (err: Error, result: Object) => void): void;
    list():Promise<WebApiResultAny>;
  }

  interface WebApiRtm {
    connect(callback: (err: Error, result: RtmConnectResult) => void): void;
    connect(): Promise<RtmConnectResult>;

    start(callback: (err: Error, result: RtmStartResult) => void): void;
    start(opts: RtmStartParams, callback: (err: Error, result: RtmStartResult) => void): void;
    start(opts?: RtmStartParams): Promise<RtmStartResult>;
  }

  interface WebApiSearch {
    all(query: string, callback: (err: Error, result: Object) => void): void;
    all(query: string, opts: Object, callback: (err: Error, result: Object) => void): void;
    all(query: string, opts?: Object): Promise<WebApiResultAny>;

    files(query: string, callback: (err: Error, result: Object) => void): void;
    files(query: string, opts: Object, callback: (err: Error, result: Object) => void): void;
    files(query: string, opts?: Object): Promise<WebApiResultAny>;

    messages(query: string, callback: (err: Error, result: Object) => void): void;
    messages(query: string, opts: Object, callback: (err: Error, result: Object) => void): void;
    messages(query: string, opts?: Object): Promise<WebApiResultAny>;
  }

  interface WebApiStars {
    add(callback: (err: Error, result: Object) => void): void;
    add(opts: Object, callback: (err: Error, result: Object) => void): void;
    add(opts?: Object): Promise<WebApiResultAny>;

    list(callback: (err: Error, result: Object) => void): void;
    list(opts: Object, callback: (err: Error, result: Object) => void): void;
    list(opts?: Object): Promise<WebApiResultAny>;

    remove(callback: (err: Error, result: Object) => void): void;
    remove(opts: Object, callback: (err: Error, result: Object) => void): void;
    remove(opts?: Object): Promise<WebApiResultAny>;
  }

  interface WebApiTeam {
    accessLogs(callback: (err: Error, result: Object) => void): void;
    accessLogs(opts: Object, callback: (err: Error, result: Object) => void): void;
    accessLogs(opts?: Object): Promise<WebApiResultAny>;

    billableInfo(callback: (err: Error, result: Object) => void): void;
    billableInfo(opts: Object, callback: (err: Error, result: Object) => void): void;
    billableInfo(opts?: Object): Promise<WebApiResultAny>;

    info(callback: (err: Error, result: TeamInfoResult) => void): void;
    info(): Promise<TeamInfoResult>;

    integrationLogs(callback: (err: Error, result: Object) => void): void;
    integrationLogs(opts: Object, callback: (err: Error, result: Object) => void): void;
    integrationLogs(opts?: Object): Promise<WebApiResultAny>;

    profile: {
      get(callback: (err: Error, result: Object) => void): void;
      get(opts: Object, callback: (err: Error, result: Object) => void): void;
      get(opts?: Object): Promise<WebApiResultAny>;
    }
  }

  interface WebApiUsergroups {
    create(name: string, callback: (err: Error, result: Object) => void): void;
    create(name: string, opts: Object, callback: (err: Error, result: Object) => void): void;
    create(name: string, opts?: Object): Promise<WebApiResultAny>;

    disable(usergroup: string, callback: (err: Error, result: Object) => void): void;
    disable(usergroup: string, opts: Object, callback: (err: Error, result: Object) => void): void;
    disable(usergroup: string, opts?: Object): Promise<WebApiResultAny>;

    enable(usergroup: string, callback: (err: Error, result: Object) => void): void;
    enable(usergroup: string, opts: Object, callback: (err: Error, result: Object) => void): void;
    enable(usergroup: string, opts?: Object): Promise<WebApiResultAny>;

    list(callback: (err: Error, result: Object) => void): void;
    list(opts: Object, callback: (err: Error, result: Object) => void): void;
    list(opts?: Object): Promise<WebApiResultAny>;

    update(usergroup: string, callback: (err: Error, result: Object) => void): void;
    update(usergroup: string, opts: Object, callback: (err: Error, result: Object) => void): void;
    update(usergroup: string, opts?: Object): Promise<WebApiResultAny>;

    users: {
      list(usergroup: string, callback: (err: Error, result: Object) => void): void;
      list(usergroup: string, opts: Object, callback: (err: Error, result: Object) => void): void;
      list(usergroup: string, opts?: Object): Promise<WebApiResultAny>;

      update(usergroup: string, users: string, callback: (err: Error, result: Object) => void): void;
      update(usergroup: string, users: string, opts: Object, callback: (err: Error, result: Object) => void): void;
      update(usergroup: string, users: string, opts?: Object): Promise<WebApiResultAny>;
    }
  }

  interface WebApiUsers {
    getPresence(callback: (err: Error, result: UsersGetPresenceResult) => void): void;
    getPresence(user: string, callback: (err: Error, result: UsersGetPresenceResult) => void): void;
    getPresence(user?: string): Promise<UsersGetPresenceResult>;

    identity(callback: (err: Error, result: Object) => void): void;
    identity(): Promise<WebApiResultAny>;

    info(callback: (err: Error, result: UsersInfoResult) => void): void;
    info(user: string, callback: (err: Error, result: UsersInfoResult) => void): void;
    info(user?: string): Promise<UsersInfoResult>;

    list(callback: (err: Error, result: UsersListResult) => void): void;
    list(opts: UsersListParams, callback: (err: Error, result: UsersListResult) => void): void;
    list(opts?: UsersListParams): Promise<UsersListResult>;

    setActive(callback: (err: Error, result: Object) => void): void;
    setActive():Promise<WebApiResultAny>;

    setPresence(presence: "auto"|"away", callback: (err: Error, result: Object) => void): void;
    setPresence(presence: "auto"|"away"): Promise<WebApiResultAny>;

    profile: {
      get(callback: (err: Error, result: Object) => void): void;
      get(opts: Object, callback: (err: Error, result: Object) => void): void;
      get(opts?: Object): Promise<WebApiResultAny>;

      set(callback: (err: Error, result: Object) => void): void;
      set(opts: Object, callback: (err: Error, result: Object) => void): void;
      set(opts?: Object): Promise<WebApiResultAny>;
    };
  }

  // Web API Parameters and results
  // https://api.slack.com/web
  interface WebApiResult {
    ok: boolean;
    error?: string;
  }

  // Generic result for untyped return values
  interface WebApiResultAny extends WebApiResult {
    [key: string]: any;
  }

  // api
  interface ApiTestParams {
    error?: any;
    [key: string]: any;
  }

  interface ApiTestResult extends WebApiResult {
    args?: {
      [key: string]: any;
    }
  }

  // auth
  interface AuthTestResult extends WebApiResult {
    url: string;
    team: string;
    user: string;
    team_id: string;
    user_id: string;
  }

  interface AuthRevokeParams {
    test?: 1;
  }

  interface AuthRevokeResult extends WebApiResult {
    revoked: boolean;
  }

  // bots
  interface BotsInfoParams {
    bot?: string;
  }

  interface BotsInfoResult extends WebApiResult {
    bot: {
      id: string,
      app_id: string,
      delete: boolean,
      name: string,
      icons: {
        image_36: string,
        image_48: string,
        image_72: string,
      }
    }
  }

  // channels
  interface ChannelsInfoResult extends WebApiResult {
    channel: FullChannelResult;
  }

  interface ChannelsListParams {
    exclude_archived?: boolean;
  }

  interface ChannelsListResult extends WebApiResult {
    channels: PartialChannelResult[];
  }

  interface PartialChannelResult {
    id: string;
    name: string;
    created: number;
    creator: string;
    is_channel?: boolean; // public channels
    is_general?: boolean;
    is_archived: boolean;
    is_mpim?: boolean;
    is_member?: boolean;
    num_members?: number;
    members: string[];
    topic: {
      value: string;
      creator: string;
      last_set: number;
    };
    purpose: {
      value: string;
      creator: string;
      last_set: number;
    };
  }

  interface FullChannelResult {
    id: string;
    name: string;

    created: number;
    creator: string;

    is_channel?: boolean; // public channels
    is_group?: boolean; // private channels
    is_im?: boolean; // IM channels
    is_open?: boolean; // IM Channels
    user?: string; // IM Channels

    is_archived: boolean;
    is_general: boolean;
    is_shared: boolean;
    is_org_shared: boolean;
    is_member?: boolean;
    is_starred?: boolean;

    members: string[];

    topic: {
      value: string;
      creator: string;
      last_set: number;
    };
    purpose: {
      value: string;
      creator: string;
      last_set: number;
    };

    last_read?: string;
    latest?: {
      user: string;
      text: string;
      type: string;
      subtype?: string;
      inviter?: string;
      ts: string;
    };
    unread_count?: number;
    unread_count_display?: number;
  }

  // chat
  interface ChatDeleteParams {
    as_user?: boolean;
  }

  interface ChatDeleteResult extends WebApiResult {
    channel: string;
    ts: string;
  }

  interface ChatMeMessageParams {
    channel: string;
    text: string;
  }

  interface ChatMeMessageResult extends WebApiResult {
    channel: string;
    ts: string;
  }

  interface ChatPostMessageParams {
    text?: string,
    attachments?: MessageAttachment[];
    channel: string;
    parse?: 'none' | 'full';
    link_names?: number;
    unfurl_links?: boolean;
    unfurl_media?: boolean;
    username?: string;
    as_user?: boolean;
    icon_url?: string;
    icon_emoji?: string;
    thread_ts?: string;
  }

  interface ChatPostMessageResult extends WebApiResult {
    ts: string;
    channel: string;
    message: string;
  }

  interface ChatUnfurlParams {
    channel: string;
    ts: string;
    unfurls: string;
    user_auth_required?: boolean | 0 | 1;
  }

  interface ChatUpdateParams {
    parse?: 'none' | 'full';
    link_names?: number;
    attachments?: MessageAttachment[];
    unfurl_links?: boolean;
    unfurl_media?: boolean;
    as_user?: boolean;
  }

  interface ChatUpdateResult extends WebApiResult {
    ts: string;
    channel: string;
    text: string;
  }


  // groups
  interface GroupsInfoResult extends WebApiResult {
    group: FullChannelResult;
  }

  interface GroupsListResult extends WebApiResult {
    groups: PartialChannelResult[];
  }

  // im
  interface ImCloseResult extends WebApiResult {
    no_op?: boolean;
    already_closed?: boolean;
  }

  interface ImHistoryParams {
    latest?: number;
    oldest?: number;
    inclusive?: number;
    count?: number;
    unreads?: number;
  }

  interface ImHistoryResult extends WebApiResult {
    latest: string;
    messages: {
      type: string;
      ts: string;
      user: string;
      text: string;
      is_starred?: boolean;
    }[];
    has_more: boolean;
  }

  interface ImListResult extends WebApiResult {
    ims: {
      id: string;
      is_im: true;
      user: string;
      created: number;
      is_user_deleted: boolean;
    }[];
  }

  interface ImOpenParams {
    return_im?: boolean;
  }

  interface ImOpenResult extends WebApiResult {
    no_op?: boolean;
    already_open?: boolean;
    channel: {
      id: string;
    };
  }

  // reactions
  interface ReactionsAddParams {
    file?: string;
    file_comment?: string;
    channel?: string;
    timestamp?: string;
  }

  interface ReactionsAddResult extends WebApiResult {}

  // rtm
  interface RtmConnectResult extends WebApiResult {
    url: string;
    team: {
      id: string;
      name: string;
      enterprise_id?: string;
      enterprise_name?: string;
    }
    self: {
      id: string;
      name: string;
    }
  }

  interface RtmStartParams {
    simple_latest?: boolean;
    no_unreads?: boolean;
    mpim_aware?: boolean;
  }

  interface RtmStartResult extends WebApiResult {
    url: string;
    self: {
      id: string;
      name: string;
      prefs: any;
      created: number;
      manual_presence: string;
    }
    team: {
      id: string;
      name: string;
      email_domain: string;
      domain: string;
      icon: any;
      msg_edit_window_mins: number;
      over_integrations_limit?: boolean;
      over_storage_limit: boolean;
      prefs: any;
      plan: string;
    }
    users: any;
    channels: any;
    groups: any;
    mpims: any;
    ims: any;
    bots: any;
  }

  // team
  interface TeamInfoResult extends WebApiResult {
    team: {
      id: string;
      name: string;
      domain: string;
      email_domain?: string;
      icon?: {
        image_34?: string;
        image_44?: string;
        image_68?: string;
        image_88?: string;
        image_102?: string;
        image_132?: string;
        image_default?: boolean;
      }
      enterprise_id?: string;
      enterprise_name?: string;
    }
  }

  // users
  interface UsersInfoResult extends WebApiResult {
    user: FullUserResult;
  }

  interface UsersListParams {
    presence?: boolean;
  }

  interface UsersListResult extends WebApiResult {
    members: FullUserResult[];
  }

  interface FullUserResult {
    id: string;
    team_id: string;
    name: string;
    deleted: boolean;
    status?: string;
    color?: string;
    real_name?: string;
    tz?: string;
    tz_label?: string;
    tz_offset?: number;
    profile: {
      bot_id?: string;
      api_app_id?: string;
      first_name?: string;
      last_name?: string;
      real_name?: string;
      real_name_normalized?: string;
      title?: string;
      email?: string;
      skype?: string;
      phone?: string;
      avatar_hash?: string;
      image_24?: string;
      image_32?: string;
      image_48?: string;
      image_72?: string;
      image_192?: string;
      image_512?: string;
      image_1024?: string;
      image_original?: string;
    }
    is_admin?: boolean;
    is_owner?: boolean;
    is_primary_owner?: boolean;
    is_restricted?: boolean;
    is_ultra_restricted?: boolean;
    is_bot?: boolean;
    has_2fa?: boolean;
    has_files?: boolean;
  }

  interface UsersGetPresenceResult extends WebApiResult {
    presence: string;
    online?: boolean;
    auto_away?: boolean;
    manual_away?: boolean;
    connection_count?: number;
    last_activity?: number;
  }

  // Slack Message and Attachment information
  // https://api.slack.com/docs/message-attachments

  interface MessageAttachment {
    fallback: string;
    color?: string;
    pretext?: string;
    author_name?: string;
    author_link?: string;
    author_icon?: string;
    title?: string;
    title_link?: string;
    text?: string;
    fields?: MessageAttachmentField[];
    image_url?: string;
    thumb_url?: string;
    mrkdwn_in?: string[];
    footer?: string;
    footer_icon?: string;
    attachment_type?: 'default';
    callback_id?: string;
    actions?: MessageActions[];
  }

  interface MessageAttachmentField {
    title?: string;
    value: string;
    short?: boolean;
  }

  interface MessageActions {
    name: string;
    text: string;
    type: 'button';
    style?: 'default' | 'primary' | 'danger';
    value?: string;
    confirm?: {
      title: string,
      text: string,
      ok_text?: string,
      dismiss_text?: string
    };
  }

  // Events
  // https://api.slack.com/events
  interface ChannelArchiveEvent {
    type: 'channel_archive';
    channel: string;
    user: string;
  }

  interface ChannelCreatedEvent {
    type: 'channel_created';
    channel: {
      id: string;
      name: string;
      created: string;
      creator: string;
    }
  }

  interface ChannelDeletedEvent {
    type: 'channel_deleted';
    channel: string;
  }

  interface ChannelJoinedEvent {
    type: 'channel_joined';
    channel: {
      id: string;
      name: string;
      created: string;
      creator: string;
    }
  }

  interface ChannelRenameEvent {
    type: 'channel_rename';
    channel: {
      id: string;
      name: string;
      created: string;
    }
  }

  interface ChannelUnarchiveEvent {
    type: 'channel_unarchive';
    channel: string;
    user: string;
  }

  interface GroupArchiveEvent {
    type: 'group_archive';
    channel: string;
  }

  interface GroupCloseEvent {
    type: 'group_close';
    user: string;
    channel: string;
  }

  interface GroupJoinedEvent {
    type: 'group_joined';
    channel: {
      id: string;
      name: string;
      created: string;
      creator: string;
    }
  }

  interface GroupLeftEvent {
    type: 'group_left';
    channel: string;
  }

  interface GroupOpenEvent {
    type: 'group_open';
    channel: string;
    user: string;
  }

  interface GroupRenameEvent {
    type: 'group_rename';
    channel: {
      id: string;
      name: string;
      created: string;
    }
  }

  interface GroupUnarchiveEvent {
    type: 'group_unarchive';
    channel: string;
    user: string;
  }

  interface GroupCreatedEvent {
    type: 'group_created';
    channel: {
      id: string;
      name: string;
      created: string;
      creator: string;
    }
  }

  interface HelloEvent {
    type: 'hello';
  }

  interface MessageEvent {
    type: 'message';
    hidden?: string;
    subtype?: string;
    channel: string;
    user: string;
    text: string;
    ts: string;
    user_team: string;
    team: string;
    attachments?: MessageAttachment[];
    deleted_ts?: string;
    is_starred?: boolean;
    pinned_to?: string[];
    edited?: {
      user: string;
      ts: string;
    };
  }

  interface ReactionEvent {
    type: 'reaction_added' | 'reaction_removed';
    user: string;
    userName: string;
    reaction: string;
    event_ts: string;
    value?: string;
    item: {
      type: string;
      channel?: string;
      ts?: string;
      file?: string;
      file_comment?: string;
    };
  }

  interface TeamDomainChangeEvent {
    type: 'team_domain_change';
    url: string;
    domain: string;
  }

  interface TeamMigrationStartedEvent {
    type: 'team_migration_started';
  }

  interface TeamPrefChangeEvent {
    type: 'team_pref_change';
    name: string;
    value: any;
  }

  interface TeamRenameEvent {
    type: 'team_rename';
    name: string;
  }

  interface UserTypingEvent {
    type: 'user_typing';
    channel: string;
    user: string;
  }
}