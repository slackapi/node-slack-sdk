import { WebAPICallOptions, WebAPIResultCallback, WebAPICallResult } from './WebClient';

// NOTE: could create a named type alias like data types like `SlackUserID: string`

/**
 * Generic method definition
 */
export default interface Method<MethodArguments extends WebAPICallOptions> {
  // TODO: can we create a relationship between MethodArguments and a MethodResult type?
  (options: MethodArguments, callback?: WebAPIResultCallback): Promise<WebAPICallResult> | void;
}

/*
 * Reusable "protocols" that some MethodArguments types can conform to
 */

interface TokenOverridable {
  token?: string;
}

interface CursorPaginationEnabled {
  limit?: number; // natural integer, max of 1000
  cursor?: string; // find this in a response's `response_metadata.next_cursor`
}

/*
 * MethodArguments types (no formal relationship other than the generic constraint in Method<>)
 */

/*
 * `users.*`
 */

export type UsersInfoArguments = TokenOverridable & {
  user: string;
};
export type UsersListArguments = TokenOverridable & CursorPaginationEnabled & {
  include_locale?: boolean; // defaults to false
  presence?: boolean; // deprecated, defaults to false
};
export type UsersLookupByEmailArguments = TokenOverridable & {
  email: string;
};
export type UsersGetPresenceArguments = TokenOverridable & {
  user: string;
};
export type UsersIdentityArguments = TokenOverridable & {};
export type UsersSetActiveArguments = TokenOverridable & {};
export type UsersSetPhotoArguments = TokenOverridable & {
  image: string; // TODO: file contents what?
  crop_w?: number;
  crop_x?: number;
  crop_y?: number;
};
export type UsersDeletePhotoArguments = TokenOverridable & {};
export type UsersSetPresenceArguments = TokenOverridable & {
  presence: 'auto' | 'away';
};
