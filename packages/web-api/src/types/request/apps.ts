import type { AppID, CursorPaginationEnabled, OAuthCredentials, TokenOverridable } from './common';
import type { Manifest } from './manifest';
import { OptionalArgument } from '../helpers';

// https://api.slack.com/methods/apps.connections.open
export type AppsConnectionsOpenArguments = OptionalArgument<object>;

// https://api.slack.com/methods/apps.event.authorizations.list
export interface AppsEventAuthorizationsListArguments
  extends TokenOverridable, CursorPaginationEnabled {
  event_context: string;
}

// https://api.slack.com/methods/apps.manifest.create
export interface AppsManifestCreateArguments extends TokenOverridable {
  manifest: Manifest;
}

// https://api.slack.com/methods/apps.manifest.delete
export interface AppsManifestDeleteArguments extends AppID, TokenOverridable {}

// https://api.slack.com/methods/apps.manifest.export
export interface AppsManifestExportArguments extends AppID, TokenOverridable {}

// https://api.slack.com/methods/apps.manifest.update
export interface AppsManifestUpdateArguments extends AppID, TokenOverridable {
  manifest: Manifest;
}

// https://api.slack.com/methods/apps.manifest.validate
export interface AppsManifestValidateArguments extends Partial<AppID>, TokenOverridable {
  manifest: Manifest;
}

// https://api.slack.com/methods/apps.uninstall
export interface AppsUninstallArguments extends Pick<OAuthCredentials, 'client_id' | 'client_secret'> {}
