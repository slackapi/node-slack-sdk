// Reusable mixins or extensions that some Method Arguments types can extend from

// Cursor, timeline and traditional pagination extensions.
export interface CursorPaginationEnabled {
  limit?: number; // natural integer, max of 1000
  cursor?: string; // find this in a response's `response_metadata.next_cursor`
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
  /** @description Authentication token bearing required scopes. */
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
