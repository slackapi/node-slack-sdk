import { TokenOverridable } from './common';
import { OptionalArgument } from '../helpers';
// https://api.slack.com/methods/emoji.list
export type EmojiListArguments = OptionalArgument<TokenOverridable & {
  /** @description Include a list of categories for Unicode emoji and the emoji in each category. */
  include_categories?: boolean;
}>;
