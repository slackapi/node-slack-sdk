import type { OptionalArgument } from '../helpers';
import type { CursorPaginationEnabled, SortDir, TokenOverridable } from './common';

type AssistantSearchChannelType = 'public_channel' | 'private_channel' | 'mpim' | 'im';
type AssistantSearchContentType = 'messages' | 'files' | 'channels' | 'users';
type AssistantSearchSort = 'score' | 'timestamp';

// https://docs.slack.dev/reference/methods/assistant.search.context
export interface AssistantSearchContextArguments extends TokenOverridable, CursorPaginationEnabled, SortDir {
  /** @description User prompt or search query. */
  query: string;
  /** @description Send `action_token` as received in a message event. */
  action_token?: string;
  /** @description UNIX timestamp filter. If present, filters for results after this date. */
  after?: number;
  /** @description UNIX timestamp filter. If present, filters for results before this date. */
  before?: number;
  /** @description Mix and match channel types to search. */
  channel_types?: AssistantSearchChannelType[];
  /** @description Content types to include in search results. */
  content_types?: AssistantSearchContentType[];
  /** @description Context channel ID to support scoping the search when applicable. */
  context_channel_id?: string;
  /** @description Whether to disable semantic search. When true, only keyword-based search is used. */
  disable_semantic_search?: boolean;
  /** @description Whether to highlight the search query in the results. */
  highlight?: boolean;
  /** @description Whether the results should include archived channels. */
  include_archived_channels?: boolean;
  /** @description Whether the results should include bots. */
  include_bots?: boolean;
  /** @description Whether to include context messages surrounding the main message result. */
  include_context_messages?: boolean;
  /** @description Whether to include deleted users in user search results. */
  include_deleted_users?: boolean;
  /** @description Whether to return message blocks in the response. */
  include_message_blocks?: boolean;
  /** @description A list of keyword clauses used to match search results. */
  keywords_clauses?: string[][];
  /** @description A string containing only modifiers in the format of `modifier:value`. */
  modifiers?: string;
  /** @description The field to sort the results by. Defaults to `score`. */
  sort?: AssistantSearchSort;
  /** @description A list of term clauses. Search results returned will match every term clause specified. */
  term_clauses?: string[];
}

// https://docs.slack.dev/reference/methods/assistant.search.info
export type AssistantSearchInfoArguments = OptionalArgument<TokenOverridable>;

// https://docs.slack.dev/reference/methods/assistant.threads.setStatus
export interface AssistantThreadsSetStatusArguments extends TokenOverridable {
  /** @description Channel ID containing the assistant thread. */
  channel_id: string;
  /** @description Status of the assistant (e.g. 'is thinking...') */
  status: string;
  /** @description Message timestamp of the thread. */
  thread_ts: string;
  /** @description The list of messages to rotate through as a loading indicator. */
  loading_messages?: string[];
  /**
   * @description Emoji to use as the icon for this message. Overrides `icon_url`.
   * @example :chart_with_upwards_trend:
   */
  icon_emoji?: string;
  /**
   * @description Image URL to use as the icon for this message.
   * @example http://lorempixel.com/48/48
   */
  icon_url?: string;
  /**
   * @description The bot's username to display.
   * @example My Bot
   */
  username?: string;
}

// https://docs.slack.dev/reference/methods/assistant.threads.setSuggestedPrompts
export interface AssistantThreadsSetSuggestedPromptsArguments extends TokenOverridable {
  /** @description Channel ID containing the assistant thread. */
  channel_id: string;
  /** @description Prompt suggestions that appear when opening assistant thread. */
  prompts: AssistantPrompt[];
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
