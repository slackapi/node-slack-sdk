import { TokenOverridable } from './common';
// https://api.slack.com/methods/emoji.list
export interface EmojiListArguments extends TokenOverridable {
  /** @description Include a list of categories for Unicode emoji and the emoji in each category. */
  include_categories?: boolean;
}
