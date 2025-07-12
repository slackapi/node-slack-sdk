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

// https://docs.slack.dev/reference/methods/apps.uninstall
export interface AppsUninstallArguments
  extends Pick<OAuthCredentials, 'client_id' | 'client_secret'>,
    TokenOverridable {}
