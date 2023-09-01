import { Block, KnownBlock } from './block-kit/blocks';
import { PlainTextElement } from './block-kit/composition-objects';

// Reference: https://api.slack.com/surfaces/app-home#composing
export interface HomeView {
  type: 'home';
  blocks: (KnownBlock | Block)[];
  private_metadata?: string;
  callback_id?: string;
  external_id?: string;
}

export interface ModalView {
  type: 'modal';
  title: PlainTextElement;
  blocks: (KnownBlock | Block)[];
  close?: PlainTextElement;
  submit?: PlainTextElement;
  private_metadata?: string;
  callback_id?: string;
  clear_on_close?: boolean; // defaults to false
  notify_on_close?: boolean; // defaults to false
  external_id?: string;
}

/**
 * {@link https://api.slack.com/legacy/workflows/steps#handle_config_view Configuration modal} for {@link https://api.slack.com/legacy/workflows/steps legacy Workflow Steps from Apps}.
 * @deprecated Steps from Apps are deprecated and will no longer be executed starting September 12, 2024. For more information, see our {@link https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back deprecation announcement}.
 */
export interface WorkflowStepView {
  type: 'workflow_step';
  blocks: (KnownBlock | Block)[];
  private_metadata?: string;
  callback_id?: string;
  submit_disabled?: boolean; // defaults to false
  external_id?: string;
}

export type View = HomeView | ModalView | WorkflowStepView;
