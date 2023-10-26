// Reusable mixins or extensions that some Method Arguments types can extend from

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
  oldest?: string;
  latest?: string;
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
