// Reusable mixins or extensions that Method Arguments types can extend from

// Cursor, timeline and traditional pagination extensions.
export interface CursorPaginationEnabled {
  /**
   * @description The maximum number of items to return. Fewer than the requested number of items may be returned,
   * even if the end of the list hasn't been reached. Must be an integer with a max value of `999`. Default is `100`.
   */
  limit?: number;
  /**
   * @description Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute
   * returned by a previous request's `response_metadata`.
   * Default value fetches the first "page" of the collection.
   * @see {@link https://api.slack.com/docs/pagination pagination} for more detail.
   */
  cursor?: string;
}

export interface TimelinePaginationEnabled {
  /** @description Only messages after this Unix timestamp will be included in results. */
  oldest?: string;
  /** @description Only messages before this Unix timestamp will be included in results. */
  latest?: string;
  /**
   * @description Include messages with `oldest` or `latest` timestamps in results.
   * Ignored unless either timestamp is specified. Defaults to `false`.
   */
  inclusive?: boolean;
}

export interface TraditionalPagingEnabled {
  /** @description Number of items to return per page. Defaults to `20` */
  count?: number;
  /** @description Page number of results to return. Defaults to `1`. */
  page?: number;
}

/**
 * Some API methods allow for overriding the auth token used with a method at runtime.
 */
export interface TokenOverridable {
  /** @description Overridable authentication token bearing required scopes. */
  token?: string;
}

/**
 * Some API methods allow to receive the locale of the content.
 */
export interface LocaleAware {
  /** @description Set this to `true` to receive the locale with the response. */
  include_locale?: boolean;
}

/**
 * Some API methods optionally require a `team_id` if an org token is used.
 */
export interface OptionalTeamAssignable {
  /** @description If using an org token, `team_id` is required. */
  team_id?: string;
}

/**
 * Some API methods use arguments for specifying a message, file or file comment.
 * E.g. `stars.*` and `reactions.*`
 */

export interface MessageArgument {
  /** @description Channel where the message was posted. */
  channel: string;
  /** @description Timestamp of the message. */
  timestamp: string;
}

export interface FileArgument {
  /** @description Encoded file ID reacted to. */
  file: string;
}

export interface FileCommentArgument {
  /** @description Encoded file comment ID reacted to. */
  file_comment: string;
}

/**
 * Some API methods use arguments related to OAuth flows.
 * E.g. `openid.*` and `oauth.*`
 */

export interface OAuthCredentials {
  /** @description Issued when you created your application. */
  client_id: string;
  /** @description Issued when you created your application. */
  client_secret: string;
  /** @description The `code` parameter returned via the OAuth callback. */
  code?: string;
  /**
   * @description While optional, it is _required_ if your app passed it as a parameter to the OpenID/OAuth flow's
   * first step and must match the originally submitted URI.
   */
  redirect_uri?: string;
}

export interface OAuthGrantRefresh {
  /** @description The `grant_type` param as described in the OAuth spec. */
  grant_type?: 'authorization_code' | 'refresh_token';
  /** @description The `refresh_token` param as described in the OAuth spec. */
  refresh_token?: string;
}
