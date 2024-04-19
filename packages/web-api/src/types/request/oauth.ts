import type { OAuthCredentials, OAuthGrantRefresh } from './common';

// https://api.slack.com/methods/oauth.access
export interface OAuthAccessArguments extends OAuthCredentials {
  /** @description Request the user to add your app only to a single channel. Only valid with a {@link https://api.slack.com/legacy-workspace-apps legacy workspace app}. Defaults to `false`. */
  single_channel?: boolean;
}
// https://api.slack.com/methods/oauth.v2.access
export interface OAuthV2AccessArguments extends OAuthCredentials, OAuthGrantRefresh {}
// https://api.slack.com/methods/oauth.v2.exchange
export interface OAuthV2ExchangeArguments extends Pick<OAuthCredentials, 'client_id' | 'client_secret'> {
  /** @description The legacy xoxb or xoxp token being migrated. */
  token: string;
}
