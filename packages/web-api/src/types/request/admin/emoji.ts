import { OptionalArgument } from '../../helpers';

import type { CursorPaginationEnabled, TokenOverridable } from '../common';

interface Name {
  /**
   * @description The name of the emoji. Colons (:myemoji:) around the value are not required,
   * although they may be included.
   */
  name: string;
}

// https://api.slack.com/methods/admin.emoji.add
export interface AdminEmojiAddArguments extends Name, TokenOverridable {
  /**
   * @description The URL of a file to use as an image for the emoji.
   * Square images under 128KB and with transparent backgrounds work best.
   */
  url: string;
}

// https://api.slack.com/methods/admin.emoji.addAlias
export interface AdminEmojiAddAliasArguments extends Name, TokenOverridable {
  /**
   * @description Name of the emoji for which the alias is being made.
   * Any wrapping whitespace or colons will be automatically trimmed.
   */
  alias_for: string;
}

// https://api.slack.com/methods/admin.emoji.list
export type AdminEmojiListArguments = OptionalArgument<TokenOverridable & CursorPaginationEnabled>;

// https://api.slack.com/methods/admin.emoji.remove
export interface AdminEmojiRemoveArguments extends Name, TokenOverridable {}

// https://api.slack.com/methods/admin.emoji.rename
export interface AdminEmojiRenameArguments extends Name, TokenOverridable {
  /** @description The new name of the emoji. */
  new_name: string;
}
