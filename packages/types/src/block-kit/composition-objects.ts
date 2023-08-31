// This file contains objects documented here: https://api.slack.com/reference/block-kit/composition-objects
// TODO: go through https://api.slack.com/reference/block-kit/composition-objects and
// - ensure JSdocs are up to date / added,
// - define missing objects, and
// - add further TODOs for future improvements / breaking changes, in prep for next major release

export interface Confirm {
  title?: PlainTextElement;
  text: PlainTextElement | MrkdwnElement;
  confirm?: PlainTextElement;
  deny?: PlainTextElement;
  style?: 'primary' | 'danger';
}

/**
 * @description Determines when an input element will return a
 * {@link https://api.slack.com/reference/interaction-payloads/block-actions `block_actions` interaction payload}.
 */
export interface DispatchActionConfig {
  /**
   * @description An array of interaction types that you would like to receive a
   * {@link https://api.slack.com/reference/interaction-payloads/block-actions `block_actions` payload} for. Should be
   * one or both of:
   *   `on_enter_pressed` — payload is dispatched when user presses the enter key while the input is in focus. Hint
   *   text will appear underneath the input explaining to the user to press enter to submit.
   *   `on_character_entered` — payload is dispatched when a character is entered (or removed) in the input.
   */
  trigger_actions_on?: ('on_enter_pressed' | 'on_character_entered')[];
}

export interface MrkdwnOption {
  text: MrkdwnElement;
  value?: string;
  url?: string;
  description?: PlainTextElement;
}

export interface PlainTextOption {
  text: PlainTextElement;
  value?: string;
  url?: string;
  description?: PlainTextElement;
}

export type Option = MrkdwnOption | PlainTextOption;

export interface PlainTextElement {
  type: 'plain_text';
  text: string;
  emoji?: boolean;
}

export interface MrkdwnElement {
  type: 'mrkdwn';
  text: string;
  verbatim?: boolean;
}
