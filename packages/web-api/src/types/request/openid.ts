// https://api.slack.com/methods/openid.connect.token
export interface OpenIDConnectTokenArguments {
  /** @description Issued when you created your application. */
  client_id: string;
  /** @description Issued when you created your application. */
  client_secret: string;
  /** @description The `code` parameter returned via the OAuth callback. */
  code?: string;
  /**
   * @description If you set a redirect URI when you created your application,
   * this property is NOT optional and must match the originally submitted URI.
   */
  redirect_uri?: string;
  /** @description The `grant_type` param as described in the OAuth spec. */
  grant_type?: 'authorization_code' | 'refresh_token';
  /** @description The `refresh_token` param as described in the OAuth spec. */
  refresh_token?: string;
}
// https://api.slack.com/methods/openid.connect.userInfo
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OpenIDConnectUserInfoArguments {}
