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
   * @description The user IDs to mark as connected.
   * At least one of `connected_user_ids` or `disconnected_user_ids` is required; combined they may not exceed 1000 users.
   */
  connected_user_ids: string[];
  disconnected_user_ids?: string[];
}

interface UserConnectionDisconnectedUserIDs {
  connected_user_ids?: string[];
  /**
   * @description The user IDs to mark as disconnected.
   * At least one of `connected_user_ids` or `disconnected_user_ids` is required; combined they may not exceed 1000 users.
   */
  disconnected_user_ids: string[];
}

// https://docs.slack.dev/reference/methods/apps.user.connection.bulkUpdate
export type AppsUserConnectionBulkUpdateArguments = TokenOverridable &
  (UserConnectionConnectedUserIDs | UserConnectionDisconnectedUserIDs);

export interface UserConnectionPrimaryProvider {
  /**
   * @description Unique identifier for this provider within the app, up to 150 characters.
   * The connect button's `action_id` is derived from it (`auth_provider_connect_{value}`).
   */
  value: string;
  /** @description Human-readable name of the provider, up to 75 characters. */
  name: PlainTextElement;
  /**
   * @description Whether this provider is currently connected. Slack records this state against the user,
   * so an omitted value is rejected with `invalid_arguments` instead of defaulting to false.
   */
  is_connected: boolean;
  /** @description Brief description of what this connection enables, up to 150 characters. */
  description?: PlainTextElement;
  /** @description URL for the provider icon image. Must be https. Defaults to the app's avatar. */
  icon_url?: string;
  /**
   * @description OAuth redirect URL opened when the user clicks Connect.
   * Must be https, on a host (or a subdomain of one) registered in the app manifest's `features.user_connections.auth_hosts`.
   */
  auth_url?: string;
  /**
   * @description URL opened when the user clicks Disconnect.
   * Must be https, on a host (or a subdomain of one) registered in the app manifest's `features.user_connections.auth_hosts`.
   */
  disconnect_url?: string;
  /** @description Display name of the connected account, up to 75 characters. Shown when `is_connected` is true. */
  connected_identity?: PlainTextElement;
  /** @description Additional context about the connection (e.g., org or workspace name), up to 75 characters. */
  connected_context?: PlainTextElement;
  /** @description Overflow menu shown when connected (e.g., Switch accounts, Disconnect). Requires 2 to 5 `options`. */
  accessory?: Overflow;
}

interface UserConnectionTriggerID {
  /** @description Opens a new authorization modal. Required unless `user_id` is provided. */
  trigger_id: string;
}

interface UserConnectionUserID {
  /**
   * @description Updates the authorization modal already open for this user. Ignored when `trigger_id` is provided.
   * Slack records `is_connected` for the user even when no modal is open, and reports that in `response_metadata.warnings`.
   */
  user_id: string;
}

// https://docs.slack.dev/reference/methods/apps.user.connection.requestAuth
export type AppsUserConnectionRequestAuthArguments = TokenOverridable &
  (UserConnectionTriggerID | UserConnectionUserID) & {
    /** @description The provider the user is asked to connect. */
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
