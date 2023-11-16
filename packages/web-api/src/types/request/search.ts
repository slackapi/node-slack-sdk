import { OptionalTeamAssignable, TokenOverridable, TraditionalPagingEnabled } from './common';

interface Searchable extends OptionalTeamAssignable {
  /** @description Search query. */
  query: string;
  /**
   * @description Set to `true` to enable query highlight markers. Defaults to `false`.
   * @see {@link https://api.slack.com/methods/search.messages#markdown `search.messages` Usage info} for details.
   */
  highlight?: boolean;
  /** @description Return matches sorted by either `score` or `timestamp`. Defaults to `score`. */
  sort?: 'score' | 'timestamp';
  /** @description Change sort direction to ascending (`asc`) or descending (`desc`). Defaults to `desc`. */
  sort_dir?: 'asc' | 'desc';
}

// https://api.slack.com/methods/search.all
export interface SearchAllArguments extends TokenOverridable, TraditionalPagingEnabled,
  Searchable { }
// https://api.slack.com/methods/search.files
export interface SearchFilesArguments extends TokenOverridable, TraditionalPagingEnabled,
  Searchable { }
// https://api.slack.com/methods/search.messages
export interface SearchMessagesArguments extends TokenOverridable, TraditionalPagingEnabled,
  Searchable { }
