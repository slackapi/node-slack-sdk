import type { TokenOverridable } from './common';

// https://api.slack.com/methods/ai.assistant.threads.setStatus
export interface AIAssistantThreadsSetStatusArguments extends TokenOverridable {
  status: string;
  channel_id: string;
  thread_ts: string;
}

// https://api.slack.com/methods/ai.assistant.threads.setSuggestedPrompts
export interface AIAssistantThreadsSetSuggestedPromptsArguments extends TokenOverridable {
  channel_id: string;
  thread_ts: string;
  title: string;
  prompts: {
    title: string;
    message: string;
  }[];
}

// https://api.slack.com/methods/ai.assistant.threads.setTitle
export interface AIAssistantThreadsSetTitleArguments extends TokenOverridable {
  title: string;
  channel_id: string;
  thread_ts: string;
}
