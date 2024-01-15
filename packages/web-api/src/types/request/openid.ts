import type { OAuthCredentials, OAuthGrantRefresh } from './common';

// https://api.slack.com/methods/openid.connect.token
export interface OpenIDConnectTokenArguments extends OAuthCredentials, OAuthGrantRefresh {}
// https://api.slack.com/methods/openid.connect.userInfo
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OpenIDConnectUserInfoArguments {}
