import type { MessageArgument, TokenOverridable } from './common';

// https://api.slack.com/methods/pins.add
export interface PinsAddArguments extends MessageArgument, TokenOverridable {}
// https://api.slack.com/methods/pins.list
export interface PinsListArguments extends TokenOverridable {
  /** @description Channel to get pinned items for. */
  channel: string;
}
// https://api.slack.com/methods/pins.remove
export interface PinsRemoveArguments extends MessageArgument, TokenOverridable {}
