import type { AnyBlock } from './block-kit/blocks';
import type { PlainTextElement } from './block-kit/composition-objects';

interface BaseView {
  /** @description An array of {@link AnyBlock} that defines the content of the view. Max of 100 blocks. */
  blocks: AnyBlock[];
  /**
   * @description String that will be sent to your app in
   * {@link https://api.slack.com/reference/interaction-payloads/views#view_submission `view_submission`} and
   * {@link https://api.slack.com/reference/interaction-payloads/block-actions `block_actions`} events.
   * Maximum length of 3000 characters.
   */
  private_metadata?: string;
  /**
   * @description An identifier to recognize interactions and submissions of this particular view. Don't use this to
   * store sensitive information (use `private_metadata` instead). Maximum length of 255 characters.
   * @see {@link https://api.slack.com/surfaces/modals#interactions Handling and responding to interactions}.
   */
  callback_id?: string;
  /** @description A custom identifier that must be unique for all views on a per-team basis. */
  external_id?: string;
}

// Reference: https://api.slack.com/surfaces/app-home#composing
export interface HomeView extends BaseView {
  /** @description The type of view. Set to `home` for Home tabs. */
  type: 'home';
}

// Reference: https://api.slack.com/surfaces/modals#composing_views
export interface ModalView extends BaseView {
  /** @description The type of view. Set to `modal` for modals. */
  type: 'modal';
  /**
   * @description The title that appears in the top-left of the modal. Must be a {@link PlainTextElement} with a
   * maximum length of 24 characters.
   */
  title: PlainTextElement;
  /**
   * @description An optional {@link PlainTextElement} that defines the text displayed in the close button at the
   * bottom-right of the view. Maximum length of 24 characters.
   */
  close?: PlainTextElement;
  /**
   * @description An optional {@link PlainTextElement} that defines the text displayed in the submit button at the
   * bottom-right of the view. `submit` is required when an input block is within the `blocks` array. Max length of 24
   * characters.
   */
  submit?: PlainTextElement;
  /**
   * @description When set to `true`, clicking on the close button will clear all views in a modal and close it.
   * Defaults to `false`.
   */
  clear_on_close?: boolean;
  /**
   * @description Indicates whether Slack will send your app a
   * {@link https://api.slack.com/reference/interaction-payloads/views#view_closed `view_closed`} event when a user
   * clicks the close button. Defaults to `false`.
   */
  notify_on_close?: boolean;
}

/**
 * {@link https://api.slack.com/legacy/workflows/steps#handle_config_view Configuration modal} for {@link https://api.slack.com/legacy/workflows/steps legacy Workflow Steps from Apps}.
 * @deprecated Steps from Apps are deprecated and will no longer be executed starting September 12, 2024. For more information, see our {@link https://docs.slack.dev/changelog/2023-08-workflow-steps-from-apps-step-back deprecation announcement}.
 */
export interface WorkflowStepView extends BaseView {
  type: 'workflow_step';
  /**
   * @description When set to `true`, disables the submit button until the user has completed one or more inputs.
   * Defaults to `false`.
   */
  submit_disabled?: boolean;
}

export type View = HomeView | ModalView | WorkflowStepView;
