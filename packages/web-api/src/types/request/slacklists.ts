import type { RichTextBlock } from '@slack/types';

import type { TokenOverridable } from './common';

// https://docs.slack.dev/reference/methods/slackLists.access.delete
export interface SlackListsAccessDeleteArguments extends TokenOverridable {
  list_id: string;
  channel_ids?: string[];
  user_ids?: string[];
}

// https://docs.slack.dev/reference/methods/slackLists.access.set
export interface SlackListsAccessSetArguments extends TokenOverridable {
  list_id: string;
  access_level: string;
  channel_ids?: string[];
  user_ids?: string[];
}

// https://docs.slack.dev/reference/methods/slackLists.create
export interface SlackListsCreateArguments extends TokenOverridable {
  name: string;
  description_blocks?: Array<RichTextBlock>;
  schema?: Array<Record<string, unknown>>;
  copy_from_list_id?: string;
  include_copied_list_records?: boolean;
  todo_mode?: boolean;
}

// https://docs.slack.dev/reference/methods/slackLists.download.get
export interface SlackListsDownloadGetArguments extends TokenOverridable {
  list_id: string;
  job_id: string;
}

// https://docs.slack.dev/reference/methods/slackLists.download.start
export interface SlackListsDownloadStartArguments extends TokenOverridable {
  list_id: string;
  include_archived?: boolean;
}

// https://docs.slack.dev/reference/methods/slackLists.items.create
export interface SlackListsItemsCreateArguments extends TokenOverridable {
  list_id: string;
  duplicated_item_id?: string;
  parent_item_id?: string;
  initial_fields?: Array<Record<string, unknown>>;
}

// https://docs.slack.dev/reference/methods/slackLists.items.delete
export interface SlackListsItemsDeleteArguments extends TokenOverridable {
  list_id: string;
  id: string;
}

// https://docs.slack.dev/reference/methods/slackLists.items.deleteMultiple
export interface SlackListsItemsDeleteMultipleArguments extends TokenOverridable {
  list_id: string;
  ids: string[];
}

// https://docs.slack.dev/reference/methods/slackLists.items.info
export interface SlackListsItemsInfoArguments extends TokenOverridable {
  list_id: string;
  id: string;
  include_is_subscribed?: boolean;
}

// https://docs.slack.dev/reference/methods/slackLists.items.list
export interface SlackListsItemsListArguments extends TokenOverridable {
  list_id: string;
  limit?: number;
  cursor?: string;
  archived?: boolean;
}

// https://docs.slack.dev/reference/methods/slackLists.items.update
export interface SlackListsItemsUpdateArguments extends TokenOverridable {
  list_id: string;
  cells: Array<Record<string, unknown>>;
}

// https://docs.slack.dev/reference/methods/slackLists.update
export interface SlackListsUpdateArguments extends TokenOverridable {
  id: string;
  name?: string;
  description_blocks?: Array<RichTextBlock>;
  todo_mode?: boolean;
}
