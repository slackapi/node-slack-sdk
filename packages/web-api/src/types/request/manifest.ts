export interface Manifest extends Record<string, unknown> {
  /** @description A group of settings that describe the manifest. */
  _metadata?: ManifestMetadata; // eslint-disable-line @typescript-eslint/naming-convention
  /**
   * @description A group of settings that describe parts of an app's appearance within Slack. If you're distributing
   * the app via the App Directory, read our {@link https://api.slack.com/start/distributing/guidelines#listing listing guidelines} to pick the best values for these settings.
   */
  display_information: ManifestDisplayInformation;
  /** @description A group of settings corresponding to the Features section of the app config pages. */
  features?: ManifestFeatures;
  /** @description A group of settings describing OAuth configuration for the app. */
  oauth_config?: ManifestOAuthConfig;
  /** @description A group of settings corresponding to the Settings section of the app config pages. */
  settings?: ManifestSettings;
  /** @description A group of settings corresponding to Custom Functions bundled in your application. */
  functions?: Record<string, ManifestFunction>;
  // TODO: future additions: external_auth_providers, workflows
}

interface ManifestMetadata {
  /**
   * @description An integer that specifies the major version of the manifest schema to target.
   * Only `1` and `2` are supported. Defaults to `1`.
   */
  major_version?: number;
  /** @description An integer that specifies the minor version of the manifest schema to target. */
  minor_version?: number;
}

interface ManifestDisplayInformation {
  /** @description A string of the name of the app. Maximum length is 35 characters. */
  name: string;
  /**
   * @description A string with a short description of the app for display to users. Maximum length is 140 characters.
   */
  description?: string;
  /** @description A string with a longer version of the description of the app. Maximum length is 4000 characters. */
  long_description?: string;
  /**
   * @description A string containing a hex color value (including the hex sign) that specifies the background color
   * used on hovercards that display information about your app. Can be 3-digit (`#000`) or 6-digit (`#000000`) hex
   * values. Once an app has set a background color value, it cannot be removed, only updated.
   */
  background_color?: string;
}

interface ManifestFeatures {
  /**
   * @description A subgroup of settings that describe {@link https://api.slack.com/surfaces/app-home App Home} configuration.
   * @see {@link https://api.slack.com/surfaces/app-home App Home}.
   */
  app_home?: ManifestAppHome;
  /**
   * @description A subgroup of settings that describe {@link https://api.slack.com/legacy/enabling-bot-users bot user} configuration.
   * @see {@link https://api.slack.com/legacy/enabling-bot-users Legacy bots}.
   */
  bot_user?: ManifestBotUser;
  /**
   * @description An array of settings groups that describe {@link https://api.slack.com/interactivity/shortcuts shortcuts}
   * configuration. A maximum of 10 shortcuts can be included in this array.
   * @see {@link https://api.slack.com/interactivity/shortcuts Shortcuts}.
   */
  shortcuts?: ManifestShortcut[];
  /**
   * @description An array of settings groups that describe {@link https://api.slack.com/interactivity/slash-commands slash commands}
   * configuration. A maximum of 50 slash commands can be included in this array.
   * @see {@link https://api.slack.com/interactivity/slash-commands Slash Commands}.
   */
  slash_commands?: ManifestSlashCommand[];
  /**
   * @description An array of strings containing valid unfurl domains to register. A maximum of 5 unfurl domains can be
   * included in this array.
   * @see {@link https://api.slack.com/reference/messaging/link-unfurling#configuring_domains Link unfurling: configuring domains}.
   */
  unfurl_domains?: string[];
}

interface ManifestAppHome {
  /**
   * @description A boolean that specifies whether or not the {@link https://api.slack.com/surfaces/app-home#home-tab Home tab} is enabled.
   * @see {@link https://api.slack.com/surfaces/app-home#home-tab Home tab}.
   */
  home_tab_enabled?: boolean;
  /**
   * @description A boolean that specifies whether or not the Messages tab in your App Home is enabled.
   * @see {@link https://api.slack.com/surfaces/app-home#messages-tab Message tab}.
   */
  messages_tab_enabled?: boolean;
  /**
   * @description A boolean that specifies whether or not the users can send messages to your app in the
   * {@link https://api.slack.com/surfaces/app-home#messages-tab Messages tab}
   * of your App Home.
   * @see {@link https://api.slack.com/surfaces/app-home#messages-tab Messages tab}.
   */
  messages_tab_read_only_enabled?: boolean;
}

interface ManifestBotUser {
  /**
   * @description A string containing the display name of the bot user. Maximum length is 80 characters.
   * Allowed characters: `a-z`, `0-9`, `-`, `_`, and `.`.
   */
  display_name: string;
  /** @description A boolean that specifies whether or not the bot user will always appear to be online. */
  always_online?: boolean;
}

interface ManifestShortcut {
  /** @description Specifies which {@link https://api.slack.com/interactivity/shortcuts#shortcut-types type of shortcut} is being described. */
  type: 'global' | 'message';
  /** @description A string containing the name of the shortcut. */
  name: string;
  /** @description A string containing the callback_id of this shortcut. Maximum length is 255 characters. */
  callback_id: string;
  /** @description A string containing a short description of this shortcut. Maximum length is 150 characters. */
  description: string;
}

interface ManifestSlashCommand {
  /**
   * @description A string containing the actual slash command. Maximum length is 32 characters, and should include
   * the leading `/` character.
   */
  command: string;
  /**
   * @description A string containing a description of the slash command that will be displayed to users.
   * Maximum length is 2000 characters.
   */
  description: string;
  /**
   * @description A boolean that specifies whether or not channels, users, and links typed with
   * the slash command should be escaped. Defaults to `false`.
   */
  should_escape?: boolean;
  /**
   * @description A string containing the full `https` URL that acts as the
   * {@link https://api.slack.com/interactivity/slash-commands#creating_commands slash command's request URL}.
   */
  url?: string; // can be absent when enabling Socket Mode
  /** @description A string a short usage hint about the slash command for users. Maximum length is 1000 characters. */
  usage_hint?: string;
}

interface ManifestOAuthConfig {
  /**
   * @description An array of strings containing {@link https://api.slack.com/authentication/oauth-v2#asking OAuth redirect URLs}.
   * A maximum of 1000 redirect URLs can be included in this array.
   */
  redirect_urls?: string[];
  /** @description A subgroup of settings that describe {@link https://api.slack.com/scopes permission scopes} configuration. */
  scopes?: ManifestOAuthScopes;
  token_management_enabled?: boolean;
}

interface ManifestOAuthScopes {
  /**
   * @description An array of strings containing {@link https://api.slack.com/scopes?filter=granular_bot granular bot scopes}
   * to request upon app installation. A maximum of 255 scopes can included in this array.
   */
  bot?: BotScope[];
  /**
   * @description An array of strings containing {@link https://api.slack.com/scopes?filter=user user scopes}
   * to request upon app installation. A maximum of 255 scopes can included in this array.
   */
  user?: UserScope[];
}

interface ManifestSettings {
  /**
   * @description An array of strings that contain IP addresses that conform to the
   * {@link https://api.slack.com/authentication/best-practices#ip_allowlisting Allowed IP Ranges} feature. Maximum of 50 IP addresses.
   */
  allowed_ip_address_ranges?: string[];
  /** @description A subgroup of settings that describe {@link https://api.slack.com/apis/connections/events-api Events API} configuration for the app. */
  event_subscriptions?: ManifestEventSubscriptions;
  /** @description A subgroup of settings that describe {@link https://api.slack.com/messaging/webhooks Incoming Webhooks} configuration for the app. */
  incoming_webhooks?: ManifestIncomingWebhooks;
  /** @description A subgroup of settings that describe {@link https://api.slack.com/interactivity interactivity} configuration for the app. */
  interactivity?: ManifestInteractivity;
  /** @description A boolean that specifies whether or not {@link https://api.slack.com/enterprise/apps organization-wide deployment} is enabled. */
  org_deploy_enabled?: boolean;
  /** @description A boolean that specifies whether or not {@link https://api.slack.com/apis/connections/socket Socket Mode} is enabled. */
  socket_mode_enabled?: boolean;
  /** @description A boolean that specifies whether or not {@link https://api.slack.com/authentication/rotation token rotation} is enabled. */
  token_rotation_enabled?: boolean;
  function_runtime?: string;
}

interface ManifestEventSubscriptions {
  /**
   * @description An array of strings matching the event types you want to the app to subscribe to.
   * A maximum of 100 event types can be used.
   * @see {@link https://api.slack.com/events Event types}.
   */
  bot_events?: ManifestEvent[];
  /**
   * @description An array of strings matching the event types you want to the app to subscribe to on
   * behalf of authorized users. A maximum of 100 event types can be used.
   * @see {@link https://api.slack.com/events Event types}.
   */
  user_events?: ManifestEvent[];
  /**
   * @description A string containing the full `https` URL that acts as the
   * {@link https://api.slack.com/apis/connections/events-api#request-urls Events API request URL}.
   * If set, you'll need to manually verify the Request URL in the App Manifest section of App Management.
   */
  request_url?: string; // can be absent when enabling Socket Mode
}

interface ManifestIncomingWebhooks {
  /** @description Whether to {@link https://api.slack.com/messaging/webhooks#enable_webhooks enable Incoming Webhooks} for your application or not. */
  incoming_webhooks_enabled?: boolean;
}

interface ManifestInteractivity {
  /** @description A boolean that specifies whether or not interactivity features are enabled. */
  is_enabled: boolean;
  /** @description A string containing the full https URL that acts as the {@link https://api.slack.com/interactivity/handling#setup interactive Options Load URL}. */
  message_menu_options_url?: string;
  /** @description A string containing the full https URL that acts as the {@link https://api.slack.com/interactivity/handling#setup interactive Request URL}. */
  request_url?: string; // can be absent when enabling Socket Mode
}

interface ManifestFunction {
  /** @description The name of your function. */
  title: string;
  /** @description A description of your function. */
  description: string;
  /** @description Input parameters that your function will accept. */
  input_parameters: ManifestParameters;
  /** @description Output parameters that your function will produce. */
  output_parameters: ManifestParameters;
}

interface ManifestParameters {
  /**
   * @description A map of property names to property definitions describing the parameter set.
   * Maximum of 50 property names can be defined.
   */
  properties: Record<string, ManifestParameterProperty>;
  /** @description Array of strings matching the propert names defined in `properties`. */
  required?: string[];
}

export type ManifestParameterProperty =
  | CommonManifestParameterProperty
  | StringManifestParameterProperty
  | NumberManifestParameterProperty;

interface CommonManifestParameterProperty {
  /** @description The type of the property. */
  type: string;
  /** @description The description of the property. */
  description?: string;
  /** @description The title of the property. */
  title?: string;
  /** @description Property usage hint. */
  hint?: string;
}

interface StringManifestParameterProperty extends CommonManifestParameterProperty {
  /** @description The type of the property. For strings, this will always be `string`. */
  type: 'string';
  minLength?: number;
  maxLength?: number;
}

interface NumberManifestParameterProperty extends CommonManifestParameterProperty {
  /** @description The type of the property. For numbers, this will always be `number`. */
  type: 'number';
  minimum?: number;
  maximum?: number;
}

// TODO: add more types that we support

// https://api.slack.com/scopes?filter=granular_bot
// var scopes = [].slice.call(document.getElementsByClassName('apiReferenceFilterableList__listItemLink'))
// .map(e => '"' + e.innerText + '"').join(' | '); console.log("type BotScope = " + scopes + ";");
type BotScope =
  | 'app_mentions:read'
  | 'bookmarks:read'
  | 'bookmarks:write'
  | 'calls:read'
  | 'calls:write'
  | 'channels:history'
  | 'channels:join'
  | 'channels:manage'
  | 'channels:read'
  | 'channels:write.invites'
  | 'channels:write.topic'
  | 'chat:write'
  | 'chat:write.customize'
  | 'chat:write.public'
  | 'commands'
  | 'conversations.connect:manage'
  | 'conversations.connect:read'
  | 'conversations.connect:write'
  | 'datastore:read'
  | 'datastore:write'
  | 'dnd:read'
  | 'emoji:read'
  | 'files:read'
  | 'files:write'
  | 'groups:history'
  | 'groups:read'
  | 'groups:write'
  | 'groups:write.invites'
  | 'groups:write.topic'
  | 'im:history'
  | 'im:read'
  | 'im:write'
  | 'incoming-webhook'
  | 'links.embed:write'
  | 'links:read'
  | 'links:write'
  | 'metadata.message:read'
  | 'mpim:history'
  | 'mpim:read'
  | 'mpim:write'
  | 'mpim:write.invites'
  | 'mpim:write.topic'
  | 'none'
  | 'pins:read'
  | 'pins:write'
  | 'reactions:read'
  | 'reactions:write'
  | 'reminders:read'
  | 'reminders:write'
  | 'remote_files:read'
  | 'remote_files:share'
  | 'remote_files:write'
  | 'team.billing:read'
  | 'team.preferences:read'
  | 'team:read'
  | 'tokens.basic'
  | 'triggers:read'
  | 'triggers:write'
  | 'usergroups:read'
  | 'usergroups:write'
  | 'users.profile:read'
  | 'users:read'
  | 'users:read.email'
  | 'users:write'
  | 'workflow.steps:execute';

// https://api.slack.com/scopes?filter=user
// var scopes = [].slice.call(document.getElementsByClassName('apiReferenceFilterableList__listItemLink'))
// .map(e => ''' + e.innerText + ''').join(' | '); console.log('type UserScope = ' + scopes + ';');
type UserScope =
  | 'admin'
  | 'admin.analytics:read'
  | 'admin.app_activities:read'
  | 'admin.apps:read'
  | 'admin.apps:write'
  | 'admin.barriers:read'
  | 'admin.barriers:write'
  | 'admin.conversations:read'
  | 'admin.conversations:write'
  | 'admin.invites:read'
  | 'admin.invites:write'
  | 'admin.roles:read'
  | 'admin.roles:write'
  | 'admin.teams:read'
  | 'admin.teams:write'
  | 'admin.usergroups:read'
  | 'admin.usergroups:write'
  | 'admin.users:read'
  | 'admin.users:write'
  | 'admin.workflows:read'
  | 'admin.workflows:write'
  | 'auditlogs:read'
  | 'bookmarks:read'
  | 'bookmarks:write'
  | 'calls:read'
  | 'calls:write'
  | 'channels:history'
  | 'channels:read'
  | 'channels:write'
  | 'channels:write.invites'
  | 'channels:write.topic'
  | 'chat:write'
  | 'chat:write:bot'
  | 'chat:write:user'
  | 'commands'
  | 'dnd:read'
  | 'dnd:write'
  | 'email'
  | 'emoji:read'
  | 'files:read'
  | 'files:write'
  | 'files:write:user'
  | 'groups:history'
  | 'groups:read'
  | 'groups:write'
  | 'groups:write.invites'
  | 'groups:write.topic'
  | 'identity.avatar'
  | 'identity.basic'
  | 'identity.email'
  | 'identity.team'
  | 'im:history'
  | 'im:read'
  | 'im:write'
  | 'incoming-webhook'
  | 'links.embed:write'
  | 'links:read'
  | 'links:write'
  | 'mpim:history'
  | 'mpim:read'
  | 'mpim:write'
  | 'mpim:write.invites'
  | 'mpim:write.topic'
  | 'openid'
  | 'pins:read'
  | 'pins:write'
  | 'profile'
  | 'reactions:read'
  | 'reactions:write'
  | 'reminders:read'
  | 'reminders:write'
  | 'remote_files:read'
  | 'remote_files:share'
  | 'search:read'
  | 'stars:read'
  | 'stars:write'
  | 'team.billing:read'
  | 'team.preferences:read'
  | 'team:read'
  | 'tokens.basic'
  | 'usergroups:read'
  | 'usergroups:write'
  | 'users.profile:read'
  | 'users.profile:write'
  | 'users:read'
  | 'users:read.email'
  | 'users:write';

// https://api.slack.com/scopes?query=Configuration
// var scopes = [].slice.call(document.getElementsByClassName('apiReferenceFilterableList__listItemLink'))
// .map(e => ''' + e.innerText + ''').join(' | '); console.log('export type AnyConfigurationScope = ' + scopes + ';');
export type AnyManifestConfigurationScope =
  | 'app_configurations:read'
  | 'app_configurations:write';

export type AppManifestLevelScopes =
  | 'authorizations:read'
  | 'connections:write';

// https://api.slack.com/events?filter=Events
// var events = [].slice.call(document.getElementsByClassName('apiReferenceFilterableList__listItemLink'))
// .map(e => '"' + e.innerText + '"').join(' | '); console.log("export type AnyMafifestEvent = " + events + ";");
type ManifestEvent =
  | 'app_home_opened'
  | 'app_mention'
  | 'app_rate_limited'
  | 'app_requested'
  | 'app_uninstalled'
  | 'call_rejected'
  | 'channel_archive'
  | 'channel_created'
  | 'channel_deleted'
  | 'channel_history_changed'
  | 'channel_id_changed'
  | 'channel_left'
  | 'channel_rename'
  | 'channel_shared'
  | 'channel_unarchive'
  | 'channel_unshared'
  | 'dnd_updated'
  | 'dnd_updated_user'
  | 'email_domain_changed'
  | 'emoji_changed'
  | 'file_change'
  | 'file_comment_added'
  | 'file_comment_deleted'
  | 'file_comment_edited'
  | 'file_created'
  | 'file_deleted'
  | 'file_public'
  | 'file_shared'
  | 'file_unshared'
  | 'grid_migration_finished'
  | 'grid_migration_started'
  | 'group_archive'
  | 'group_close'
  | 'group_deleted'
  | 'group_history_changed'
  | 'group_left'
  | 'group_open'
  | 'group_rename'
  | 'group_unarchive'
  | 'im_close'
  | 'im_created'
  | 'im_history_changed'
  | 'im_open'
  | 'invite_requested'
  | 'link_shared'
  | 'member_joined_channel'
  | 'member_left_channel'
  | 'message'
  | 'message.app_home'
  | 'message.channels'
  | 'message.groups'
  | 'message.im'
  | 'message.mpim'
  | 'message_metadata_deleted'
  | 'message_metadata_posted'
  | 'message_metadata_updated'
  | 'pin_added'
  | 'pin_removed'
  | 'reaction_added'
  | 'reaction_removed'
  | 'resources_added'
  | 'resources_removed'
  | 'scope_denied'
  | 'scope_granted'
  | 'shared_channel_invite_accepted'
  | 'shared_channel_invite_approved'
  | 'shared_channel_invite_declined'
  | 'shared_channel_invite_received'
  | 'star_added'
  | 'star_removed'
  | 'subteam_created'
  | 'subteam_members_changed'
  | 'subteam_self_added'
  | 'subteam_self_removed'
  | 'subteam_updated'
  | 'team_access_granted'
  | 'team_access_revoked'
  | 'team_domain_change'
  | 'team_join'
  | 'team_rename'
  | 'tokens_revoked'
  | 'url_verification'
  | 'user_change'
  | 'user_huddle_changed'
  | 'user_profile_changed'
  | 'user_resource_denied'
  | 'user_resource_granted'
  | 'user_resource_removed'
  | 'user_status_changed'
  | 'workflow_deleted'
  | 'workflow_published'
  | 'workflow_step_deleted'
  | 'workflow_step_execute'
  | 'workflow_unpublished';
