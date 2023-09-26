// This file contains reusable extensions/mixins that other Block Kit elements will extend from.
import { Confirm, PlainTextElement, DispatchActionConfig } from './composition-objects';

// TODO: breaking change: remove `Action` and move properties to `Actionable` on next major release.
/**
 * @deprecated {@link Action} aliased to {@link Actionable} in order to name the mixins in this file consistently.
 */
export interface Action {
  type: string;
  /**
   * @description: An identifier for this action. You can use this when you receive an interaction payload to
   * {@link https://api.slack.com/interactivity/handling#payloads identify the source of the action}. Should be unique
   * among all other `action_id`s in the containing block. Maximum length for this field is 255 characters.
   */
  action_id?: string;
}

export interface Actionable extends Action {} // eslint-disable-line @typescript-eslint/no-empty-interface

export interface Confirmable {
  /**
   * @description A {@link Confirm} object that defines an optional confirmation dialog after the element is interacted
   * with.
   */
  confirm?: Confirm;
}

export interface Focusable {
  /**
   * @description Indicates whether the element will be set to auto focus within the
   * {@link https://api.slack.com/reference/surfaces/views `view` object}. Only one element can be set to `true`.
   * Defaults to `false`.
   */
  focus_on_load?: boolean;
}

export interface Placeholdable {
  /**
   * @description A {@link PlainTextElement} object that defines the placeholder text shown on the element. Maximum
   * length for the `text` field in this object is 150 characters.
   */
  placeholder?: PlainTextElement;
}

export interface Dispatchable {
  /**
   * @description A {@link DispatchActionConfig} object that determines when during text input the element returns a
   * {@link https://api.slack.com/reference/interaction-payloads/block-actions `block_actions` payload}.
   */
  dispatch_action_config?: DispatchActionConfig;
}
