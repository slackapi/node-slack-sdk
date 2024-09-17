import type { TokenOverridable } from './common';

// https://api.slack.com/methods/assistant.threads.setStatus
export interface AssistantThreadsSetStatusArguments extends TokenOverridable {
  channel_id: string;
  status: string;
  thread_ts: string;
}

// https://api.slack.com/methods/assistant.threads.setSuggestedPrompts
export interface AssistantThreadsSetSuggestedPromptsArguments extends TokenOverridable {
  channel_id: string;
  prompts: {
    title: string;
    message: string;
  }[];
  thread_ts: string;
  title?: string;
}

// https://api.slack.com/methods/assistant.threads.setTitle
export interface AssistantThreadsSetTitleArguments extends TokenOverridable {
  channel_id: string;
  thread_ts: string;
  title: string;
}
