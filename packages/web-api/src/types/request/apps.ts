import type { CursorPaginationEnabled, TokenOverridable, OAuthCredentials } from './common';

// https://api.slack.com/methods/apps.connections.open
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppsConnectionsOpenArguments { }

// https://api.slack.com/methods/apps.event.authorizations.list
export interface AppsEventAuthorizationsListArguments
  extends TokenOverridable, CursorPaginationEnabled {
  event_context: string;
}

// TODO:determine how to type the `manifest` field: string? actual interface?
// some prior art we can borrow/steal from:
// - https://github.com/seratch/slack-web-api-client/blob/main/src/manifest/manifest-params.ts
// - https://github.com/slackapi/deno-slack-sdk/blob/main/src/manifest/manifest_schema.ts#L14
// TODO:should also link to https://api.slack.com/reference/manifests#fields throughout
// https://api.slack.com/methods/apps.manifest.create
export interface AppsManifestCreateArguments extends TokenOverridable {
  manifest: string;
}

// https://api.slack.com/methods/apps.manifest.delete
export interface AppsManifestDeleteArguments extends TokenOverridable {
  app_id: string;
}

// https://api.slack.com/methods/apps.manifest.export
export interface AppsManifestExportArguments extends TokenOverridable {
  app_id: string;
}

// https://api.slack.com/methods/apps.manifest.update
export interface AppsManifestUpdateArguments extends TokenOverridable {
  app_id: string;
  manifest: string;
}

// https://api.slack.com/methods/apps.manifest.validate
export interface AppsManifestValidateArguments extends TokenOverridable {
  app_id?: string;
  manifest: string;
}

// https://api.slack.com/methods/apps.uninstall
export interface AppsUninstallArguments extends Pick<OAuthCredentials, 'client_id' | 'client_secret'> {}
