import type { Overflow, PlainTextElement } from '@slack/types';

import type { OptionalArgument } from '../helpers';

import type { AppID, CursorPaginationEnabled, OAuthCredentials, TokenOverridable } from './common';
import type { Manifest } from './manifest';

// https://docs.slack.dev/reference/methods/apps.connections.open
export type AppsConnectionsOpenArguments = OptionalArgument<object>;

// https://docs.slack.dev/reference/methods/apps.event.authorizations.list
export interface AppsEventAuthorizationsListArguments extends TokenOverridable, CursorPaginationEnabled {
  event_context: string;
}

// https://docs.slack.dev/reference/methods/apps.manifest.create
export interface AppsManifestCreateArguments extends TokenOverridable {
  manifest: Manifest;
}

// https://docs.slack.dev/reference/methods/apps.manifest.delete
export interface AppsManifestDeleteArguments extends AppID, TokenOverridable {}

// https://docs.slack.dev/reference/methods/apps.manifest.export
export interface AppsManifestExportArguments extends AppID, TokenOverridable {}

// https://docs.slack.dev/reference/methods/apps.manifest.update
export interface AppsManifestUpdateArguments extends AppID, TokenOverridable {
  manifest: Manifest;
}

// https://docs.slack.dev/reference/methods/apps.manifest.validate
export interface AppsManifestValidateArguments extends Partial<AppID>, TokenOverridable {
  manifest: Manifest;
}

interface UserConnectionConnectedUserIDs {
  /**
   * @description IDs of users connected to the app.
   * One of `connected_user_ids` or `disconnected_user_ids` is required; combined they may not exceed 1000.
   */
  connected_user_ids: string[];
  disconnected_user_ids?: string[];
}

interface UserConnectionDisconnectedUserIDs {
  connected_user_ids?: string[];
  /**
   * @description IDs of users not connected to the app.
   * One of `connected_user_ids` or `disconnected_user_ids` is required; combined they may not exceed 1000.
   */
  disconnected_user_ids: string[];
}

// https://docs.slack.dev/reference/methods/apps.user.connection.bulkUpdate
export type AppsUserConnectionBulkUpdateArguments = TokenOverridable &
  (UserConnectionConnectedUserIDs | UserConnectionDisconnectedUserIDs);

export interface UserConnectionPrimaryProvider {
  /**
   * @description Unique identifier for this provider within the app. Included in interaction payloads and used to
   * derive the connect button `action_id` (`auth_provider_connect_<value>`).
   */
  value: string;
  /** @description Human-readable name of the provider. */
  name: PlainTextElement;
  /**
   * @description Whether this provider is currently connected. Required: Slack records this state against the user,
   * so an omitted value would be indistinguishable from an explicit false and would silently mark the user disconnected.
   */
  is_connected: boolean;
  /** @description Brief description of what this connection enables. */
  description?: PlainTextElement;
  /** @description URL for the provider icon image. Must be https. Falls back to the app's avatar when absent or on load failure. */
  icon_url?: string;
  /** @description OAuth redirect URL opened when the user clicks Connect. Must be https. */
  auth_url?: string;
  /** @description URL opened when the user clicks Disconnect. Must be https, on a registered auth host. */
  disconnect_url?: string;
  /** @description Display name of the connected account, shown when `is_connected` is true. */
  connected_identity?: PlainTextElement;
  /** @description Additional context about the connection (e.g. org or workspace name). */
  connected_context?: PlainTextElement;
  /** @description Overflow menu shown when connected (e.g. Switch accounts, Disconnect). */
  accessory?: Overflow;
}

interface UserConnectionTriggerID {
  /** @description The `trigger_id` from the `user_connection` interactive callback. Opens a new modal. */
  trigger_id: string;
}

interface UserConnectionUserID {
  /**
   * @description The user whose auth modal to update. Required when `trigger_id` is omitted, and ignored when it is
   * present.
   */
  user_id: string;
}

// https://docs.slack.dev/reference/methods/apps.user.connection.requestAuth
export type AppsUserConnectionRequestAuthArguments = TokenOverridable &
  (UserConnectionTriggerID | UserConnectionUserID) & {
    /** @description The connection to render. Its `icon_url` defaults to the app's own avatar when omitted. */
    primary_provider: UserConnectionPrimaryProvider;
  };

// https://docs.slack.dev/reference/methods/apps.user.connection.update
export interface AppsUserConnectionUpdateArguments extends TokenOverridable {
  /** @description The identifier for the user receiving the status update. */
  user_id: string;
  /** @description The connection status value to assign to the user. `connected` or `disconnected`. */
  status: string;
}

// https://docs.slack.dev/reference/methods/apps.uninstall
export interface AppsUninstallArguments
  extends Pick<OAuthCredentials, 'client_id' | 'client_secret'>,
    TokenOverridable {}
