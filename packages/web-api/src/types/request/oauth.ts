import type { OAuthCredentials, OAuthGrantRefresh } from './common';

// https://docs.slack.dev/reference/methods/oauth.access
export interface OAuthAccessArguments extends OAuthCredentials {
  /** @description Request the user to add your app only to a single channel. Only valid with a {@link https://docs.slack.dev/legacy/legacy-steps-from-apps legacy workspace app}. Defaults to `false`. */
  single_channel?: boolean;
}
// https://docs.slack.dev/reference/methods/oauth.v2.access
export interface OAuthV2AccessArguments extends OAuthCredentials, OAuthGrantRefresh {}
// https://docs.slack.dev/reference/methods/oauth.v2.exchange
export interface OAuthV2ExchangeArguments extends Pick<OAuthCredentials, 'client_id' | 'client_secret'> {
  /** @description The legacy xoxb or xoxp token being migrated. */
  token: string;
}
