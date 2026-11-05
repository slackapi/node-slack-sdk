// This file contains reusable extensions/mixins that other Block Kit elements will extend from.
import type { ConfirmationDialog, DispatchActionConfig, PlainTextElement } from './composition-objects';

// TODO: breaking change: remove `Action` and move properties to `Actionable` on next major release.
/**
 * @deprecated {@link Action} aliased to {@link Actionable} in order to name the mixins in this file consistently.
 */
export interface Action {
  type: string;
  /**
   * @description: An identifier for this action. You can use this when you receive an interaction payload to
   * {@link https://docs.slack.dev/interactivity/handling-user-interaction#payloads identify the source of the action}. Should be unique
   * among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.
   */
  action_id?: string;
}

export interface Actionable extends Action {}

export interface Confirmable {
  /**
   * @description A {@link Confirm} object that defines an optional confirmation dialog after the element is interacted
   * with.
   */
  confirm?: ConfirmationDialog;
}

export interface Dispatchable {
  /**
   * @description A {@link DispatchActionConfig} object that determines when during text input the element returns a
   * {@link https://docs.slack.dev/reference/interaction-payloads/block_actions-payload `block_actions` payload}.
   */
  dispatch_action_config?: DispatchActionConfig;
}

export interface Focusable {
  /**
   * @description Indicates whether the element will be set to auto focus within the
   * {@link https://docs.slack.dev/surfaces/modals `view` object}. Only one element can be set to `true`.
   * Defaults to `false`.
   */
  focus_on_load?: boolean;
}

export interface MaxItemsSelectable {
  /**
   * @description Specifies the maximum number of items that can be selected. Minimum number is 1.
   */
  max_selected_items?: number;
}

export interface Placeholdable {
  /**
   * @description A {@link PlainTextElement} object that defines the placeholder text shown on the element. Maximum
   * length for the `text` field in this object is 150 characters.
   */
  placeholder?: PlainTextElement;
}

export interface URLRespondable {
  /**
   * @description When set to `true`, the {@link https://docs.slack.dev/reference/interaction-payloads/view-interactions-payload#view_submission `view_submission` payload}
   * from the menu's parent view will contain a `response_url`. This `response_url` can be used for
   * {@link https://docs.slack.dev/interactivity/handling-user-interaction#message_responses message responses}. The target conversation
   * for the message will be determined by the value of this select menu.
   */
  response_url_enabled?: boolean;
}

/** For use in setting border style details on certain Rich Text elements. */
export interface RichTextBorderable {
  /**
   * @description Whether to render a quote-block-like border on the inline side of the list. `0` renders no border
   * while `1` renders a border.
   */
  border?: 0 | 1;
}

/**
 * @description For use styling Rich Text sub-elements.
 */
export interface RichTextStyleable {
  /**
   * @description A limited style object for styling rich text `text` elements.
   */
  style?: {
    /** @description When `true`, boldens the text in this element. Defaults to `false`. */
    bold?: boolean;
    /** @description When `true`, the text is preformatted in an inline code style. Defaults to `false. */
    code?: boolean;
    /** @description When `true`, italicizes the text in this element. Defaults to `false`. */
    italic?: boolean;
    /** @description When `true`, strikes through the text in this element. Defaults to `false`. */
    strike?: boolean;
    /** @description When `true`, underlines the text in this element. Defaults to `false`. */
    underline?: boolean;
  };
}
