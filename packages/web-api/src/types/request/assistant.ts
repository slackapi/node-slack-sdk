import type { TokenOverridable } from './common';

// https://docs.slack.dev/reference/methods/assistant.threads.setStatus
export interface AssistantThreadsSetStatusArguments extends TokenOverridable {
  /** @description Channel ID containing the assistant thread. */
  channel_id: string;
  /** @description Status of the assistant (e.g. 'is thinking...') */
  status: string;
  /** @description Message timestamp of the thread. */
  thread_ts: string;
}

// https://docs.slack.dev/reference/methods/assistant.threads.setSuggestedPrompts
export interface AssistantThreadsSetSuggestedPromptsArguments extends TokenOverridable {
  /** @description Channel ID containing the assistant thread. */
  channel_id: string;
  /** @description Prompt suggestions that appear when opening assistant thread. */
  prompts: [AssistantPrompt, ...AssistantPrompt[]];
  /** @description Message timestamp of the thread. */
  thread_ts: string;
  /** @description Title for the prompts. */
  title?: string;
}

interface AssistantPrompt {
  /** @description Title of the prompt. */
  title: string;
  /** @description Message of the prompt. */
  message: string;
}

// https://docs.slack.dev/reference/methods/assistant.threads.setTitle
export interface AssistantThreadsSetTitleArguments extends TokenOverridable {
  /** @description Channel ID containing the assistant thread. */
  channel_id: string;
  /** @description Message timestamp of the thread. */
  thread_ts: string;
  /** @description Title of the thread. */
  title: string;
}
