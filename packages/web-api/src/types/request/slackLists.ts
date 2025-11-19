import type { RichTextBlock } from '@slack/types';

import type { TokenOverridable } from './common';

// https://docs.slack.dev/reference/methods/slackLists.access.delete
export interface SlackListsAccessDeleteArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description List of channels you wish to update access for. Can only be used if user_ids is not provided.
   */
  channel_ids?: string[];

  /**
   * @description List of users you wish to update access for. Can only be used if channel_ids is not provided.
   */
  user_ids?: string[];
}

// https://docs.slack.dev/reference/methods/slackLists.access.set
export interface SlackListsAccessSetArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description Desired level of access.
   */
  access_level: string;

  /**
   * @description List of channels you wish to update access for. Can only be used if user_ids is not provided.
   */
  channel_ids?: string[];

  /**
   * @description List of users you wish to update access for. Can only be used if channel_ids is not provided.
   */
  user_ids?: string[];
}

// https://docs.slack.dev/reference/methods/slackLists.create
export interface SlackListsCreateArguments extends TokenOverridable {
  /**
   * @description Name of the List.
   */
  name: string;

  /**
   * @description A rich text description of the List.
   */
  description_blocks?: Array<RichTextBlock>;

  /**
   * @description Column definition for the List.
   * @see {@link https://docs.slack.dev/reference/methods/slackLists.create#schema-definition}
   */
  schema?: Array<Record<string, unknown>>;

  /**
   * @description ID of the List to copy.
   */
  copy_from_list_id?: string;

  /**
   * @description Boolean indicating whether to include records when a List is copied.
   */
  include_copied_list_records?: boolean;

  /**
   * @description Boolean indicating whether the List should be used to track todo tasks.
   */
  todo_mode?: boolean;
}

// https://docs.slack.dev/reference/methods/slackLists.download.get
export interface SlackListsDownloadGetArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description The ID of the recently started job to export the List.
   */
  job_id: string;
}

// https://docs.slack.dev/reference/methods/slackLists.download.start
export interface SlackListsDownloadStartArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description Boolean indicating whether to include archived items.
   */
  include_archived?: boolean;
}

// https://docs.slack.dev/reference/methods/slackLists.items.create
export interface SlackListsItemsCreateArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description ID of the record to make a copy of.
   */
  duplicated_item_id?: string;

  /**
   * @description ID of the parent record for this subtask.
   */
  parent_item_id?: string;

  /**
   * @description Initial item data.
   */
  initial_fields?: Array<Record<string, unknown>>;
}

// https://docs.slack.dev/reference/methods/slackLists.items.delete
export interface SlackListsItemsDeleteArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description ID of item to delete.
   */
  id: string;
}

// https://docs.slack.dev/reference/methods/slackLists.items.deleteMultiple
export interface SlackListsItemsDeleteMultipleArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description IDs of the items to delete.
   */
  ids: string[];
}

// https://docs.slack.dev/reference/methods/slackLists.items.info
export interface SlackListsItemsInfoArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description ID of item to delete.
   */
  id: string;

  /**
   * @description Set to true to include is_subscribed data for the returned List row.
   */
  include_is_subscribed?: boolean;
}

// https://docs.slack.dev/reference/methods/slackLists.items.list
export interface SlackListsItemsListArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description The maximum number of records to return.
   */
  limit?: number;

  /**
   * @description Next cursor for pagination.
   */
  cursor?: string;

  /**
   * @description Boolean indicating whether archived items or normal items should be returned.
   */
  archived?: boolean;
}

// https://docs.slack.dev/reference/methods/slackLists.items.update
export interface SlackListsItemsUpdateArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  list_id: string;

  /**
   * @description Cells to update.
   */
  cells: Array<Record<string, unknown>>;
}

// https://docs.slack.dev/reference/methods/slackLists.update
export interface SlackListsUpdateArguments extends TokenOverridable {
  /**
   * @description Encoded ID of the List.
   */
  id: string;

  /**
   * @description Name of the List.
   */
  name?: string;

  /**
   * @description A rich text description of the List.
   */
  description_blocks?: Array<RichTextBlock>;

  /**
   * @description Boolean indicating whether the List should be used to track todo tasks.
   */
  todo_mode?: boolean;
}
