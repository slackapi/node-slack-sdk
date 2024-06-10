import type { OAuthCredentials, OAuthGrantRefresh } from './common';
import { OptionalArgument } from '../helpers';

// https://api.slack.com/methods/openid.connect.token
export interface OpenIDConnectTokenArguments extends OAuthCredentials, OAuthGrantRefresh {}
// https://api.slack.com/methods/openid.connect.userInfo
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type OpenIDConnectUserInfoArguments = OptionalArgument<object>;
