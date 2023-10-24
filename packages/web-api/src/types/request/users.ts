import { Stream } from 'node:stream';
import { TokenOverridable, CursorPaginationEnabled, OptionalTeamAssignable, LocaleAware } from './common';

// https://api.slack.com/methods/users.conversations
export interface UsersConversationsArguments extends TokenOverridable, CursorPaginationEnabled, OptionalTeamAssignable {
  exclude_archived?: boolean;
  types?: string; // comma-separated list of conversation types
  user?: string;
}
// https://api.slack.com/methods/users.deletePhoto
export interface UsersDeletePhotoArguments extends TokenOverridable { }
// https://api.slack.com/methods/users.getPresence
export interface UsersGetPresenceArguments extends TokenOverridable {
  user?: string;
}
// https://api.slack.com/methods/users.identity
export interface UsersIdentityArguments extends TokenOverridable { }
// https://api.slack.com/methods/users.info
export interface UsersInfoArguments extends TokenOverridable, LocaleAware {
  user: string;
}
// https://api.slack.com/methods/users.list
export interface UsersListArguments extends TokenOverridable, CursorPaginationEnabled,
  LocaleAware, OptionalTeamAssignable { }
// https://api.slack.com/methods/users.lookupByEmail
export interface UsersLookupByEmailArguments extends TokenOverridable {
  email: string;
}
// https://api.slack.com/methods/users.setPhoto
export interface UsersSetPhotoArguments extends TokenOverridable {
  image: Buffer | Stream;
  crop_w?: number;
  crop_x?: number;
  crop_y?: number;
}
// https://api.slack.com/methods/users.setPresence
export interface UsersSetPresenceArguments extends TokenOverridable {
  presence: 'auto' | 'away';
}
// https://api.slack.com/methods/users.profile.get
export interface UsersProfileGetArguments extends TokenOverridable {
  include_labels?: boolean;
  user?: string;
}
// TODO: breaking change: either profile or name/value pair must be provided
// https://api.slack.com/methods/users.profile.set
export interface UsersProfileSetArguments extends TokenOverridable {
  profile?: string; // url-encoded json
  user?: string; // must be an admin user and must be on a paid plan
  name?: string; // usable if `profile` is not passed
  value?: string; // usable if `profile` is not passed
}
