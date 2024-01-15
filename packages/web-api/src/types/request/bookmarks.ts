import type { TokenOverridable } from './common';

interface Channel {
  /** @description Channel containing bookmark. */
  channel_id: string;
}
interface ID {
  bookmark_id: string;
}
interface BookmarkFields {
  /** @description Title for the bookmark. */
  title: string;
  /** @description Link to bookmark. */
  link: string;
  /** @description Emoji tag to apply to the bookmark. */
  emoji?: string;
}

// https://api.slack.com/methods/bookmarks.add
export interface BookmarksAddArguments extends Channel, BookmarkFields, TokenOverridable {
  /** @description Type of the bookmark. Only `link` is supported at the moment. */
  type: 'link';
  /** @description ID of the entity being bookmarked. Only applies to message and file types. */
  entity_id?: string;
  /** @description ID of this bookmark's parent. */
  parent_id?: string;
}
// https://api.slack.com/methods/bookmarks.edit
export interface BookmarksEditArguments extends Channel, ID, Partial<BookmarkFields>, TokenOverridable {}

// https://api.slack.com/methods/bookmarks.list
export interface BookmarksListArguments extends Channel, TokenOverridable {}

// https://api.slack.com/methods/bookmarks.remove
export interface BookmarksRemoveArguments extends Channel, ID, TokenOverridable {}
