import type { OptionalArgument } from '../helpers';
import type { TokenOverridable } from './common';

// https://docs.slack.dev/reference/methods/assistant.search.context
export interface AssistantSearchContextArguments extends TokenOverridable {
  /** @description User prompt or search query */
  query: string;
  /** @description Send `action_token` as received in a message event. */
  action_token?: string;
  /**
   * @description Mix and match channel types by providing a comma-separated list of any combination of
   * `public_channel`, `private_channel`, `mpim`, `im`.
   */
  channel_types?: ('public_channel' | 'private_channel' | 'mpim' | 'im')[];
  /**
   * @description Content types to include, a comma-separated list of any combination of `messages`, `files`,
   * `channels`, `users`.
   */
  content_types?: ('messages' | 'files' | 'enterprise' | 'channels' | 'users')[];
  /** @description Whether the results should include bots. */
  include_bots?: boolean;
  /** @description Whether to include deleted users in the user search results. Defaults to false. */
  include_deleted_users?: boolean;
  /** @description UNIX timestamp filter. If present, filters for results before this date. */
  before?: number;
  /** @description UNIX timestamp filter. If present, filters for results after this date. */
  after?: number;
  /**
   * @description Whether to include context messages surrounding the main message result. Defaults to false if
   * unspecified.
   */
  include_context_messages?: boolean;
  /** @description Context channel ID to support scoping the search when applicable. */
  context_channel_id?: string;
  /**
   * @description The cursor returned by the API. Leave this blank for the first request and use this to get the
   * next page of results.
   */
  cursor?: string;
  /** @description Number of results to return, up to a max of 20. Defaults to 20. */
  limit?: number;
  /** @description The field to sort the results by. Defaults to score. Can be one of: score, timestamp. */
  sort?: 'score' | 'timestamp';
  /** @description The direction to sort the results by. Defaults to desc. */
  sort_dir?: 'asc' | 'desc';
  /** @description Whether to return the message blocks in the response. */
  include_message_blocks?: boolean;
  /** @description Whether to highlight the search query in the results. Defaults to false if unspecified. */
  highlight?: boolean;
  /**
   * @description A list of term clauses. A term clause is a string with search terms. Search results returned will
   * match every term clause specified (i.e., conjunctive normal form).
   */
  term_clauses?: string[];
  /**
   * @description A string containing only modifiers in the format of `modifier:value`. Search results returned
   * will match the modifier value. For now modifiers only affect term clauses.
   */
  modifiers?: string;
  /** @description Whether to include archived channels in the search results. */
  include_archived_channels?: boolean;
  /**
   * @description Whether to disable semantic search. When true, only keyword-based search is used. Defaults to
   * false.
   */
  disable_semantic_search?: boolean;
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
  thread_ts?: string;
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
