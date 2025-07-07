import type { ChannelID, TokenOverridable } from './common';

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

// https://docs.slack.dev/reference/methods/bookmarks.add
export interface BookmarksAddArguments extends ChannelID, BookmarkFields, TokenOverridable {
  /** @description Type of the bookmark. Only `link` is supported at the moment. */
  type: 'link';
  /** @description ID of the entity being bookmarked. Only applies to message and file types. */
  entity_id?: string;
  /** @description ID of this bookmark's parent. */
  parent_id?: string;
}
// https://docs.slack.dev/reference/methods/bookmarks.edit
export interface BookmarksEditArguments extends ChannelID, ID, Partial<BookmarkFields>, TokenOverridable {}

// https://docs.slack.dev/reference/methods/bookmarks.list
export interface BookmarksListArguments extends ChannelID, TokenOverridable {}

// https://docs.slack.dev/reference/methods/bookmarks.remove
export interface BookmarksRemoveArguments extends ChannelID, ID, TokenOverridable {}
