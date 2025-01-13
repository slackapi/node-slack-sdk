import type { OptionalArgument } from '../helpers';

import type { OAuthCredentials, OAuthGrantRefresh } from './common';

// https://api.slack.com/methods/openid.connect.token
export interface OpenIDConnectTokenArguments extends OAuthCredentials, OAuthGrantRefresh {}
// https://api.slack.com/methods/openid.connect.userInfo
export type OpenIDConnectUserInfoArguments = OptionalArgument<object>;
