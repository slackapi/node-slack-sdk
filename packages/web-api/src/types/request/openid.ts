import type { OptionalArgument } from '../helpers';

import type { OAuthCredentials, OAuthGrantRefresh } from './common';

// https://docs.slack.dev/reference/methods/openid.connect.token
export interface OpenIDConnectTokenArguments extends OAuthCredentials, OAuthGrantRefresh {}
// https://docs.slack.dev/reference/methods/openid.connect.userInfo
export type OpenIDConnectUserInfoArguments = OptionalArgument<object>;
